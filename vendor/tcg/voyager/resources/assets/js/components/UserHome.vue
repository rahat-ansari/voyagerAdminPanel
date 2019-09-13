<template>
    <div>

        <div class="upload text-center">
            <Upload
                    :before-upload="handleUpload"
                    action="/upload-text" accept=".txt">
                <Button icon="ios-cloud-upload-outline">Select File</Button>
            </Upload>
            <div v-if="file !== null">
               <div v-if="file">
                   Upload File: {{ file.name }}
                   <Button type="dashed" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'uploading' : 'Upload' }}</Button>
               </div>
            </div>
        </div>

        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>Provide Info to Get DNA Report!</span>
            </p>
            <div style="">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="60">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                    </FormItem>


                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" v-on:click="handleSubmit('formValidate')">Submit</Button>
            </div>
        </Modal>


    </div>
</template>
<script>

    export default {
        data() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                file: '',
                show: false,
                href: '/upload-text',
                loadingStatus: false,
                files: [],
                modal2: false,
                modal_loading: false,
                formValidate: {
                    name: '',
                    mail: '',

                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file;
                //console.log(this.file);
                return false;
            },
            upload () {
                this.loadingStatus = true;
                let fileFormData = new FormData();
                fileFormData.append('file', this.file);
                let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                //console.log(this.file);
                this.modal2 = true;
                axios
                    .post('/upload-text', fileFormData, requestConfig)
                    .then((res) => {
                    //console.log(res.data);
                        //this.loadingStatus = false;
                        this.$Message.config({
                            top: 100,

                        });
                        setTimeout(() => {
                            this.file = null;
                            this.loadingStatus = false;
                            this.$Message.success('File Uploaded Successfully!')
                        }, 1500);

                }).catch(error => (this.errors = error.response.data.errors));


            },
            del () {
                this.modal_loading = true;
                this.$Message.config({
                    top: 100,
                    duration: 3
                });
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    /*this.$Message.success('Successfully delete');*/
                }, 2000);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        axios
                            .post("/upload-text", this.formValidate)
                            .then(res => {
                                //console.log(res.data);
                                this.modal2 = false;
                                //this.$router.push("/admin/home");
                                //window.location.href = "/admin/home";

                            })
                            .catch(error => (this.errors = error.response.data.errors));
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            previewFiles(event) {
                var input = event.target;
                var reader = new FileReader();
                reader.onload = function () {
                    var text = reader.result;
                    var node = document.getElementById('output');
                    node.innerText = text;
                };
               reader.readAsText(input.files[0]);
               this.files = this.$refs.myFiles.value;
            }

        }

    }
</script>

<style scoped>

</style>
