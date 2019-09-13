<template>
  <div>
    <div class="login-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5" style="background-color: #e4effb">
            <div class="login-box parent fr-height">
              <div class="child2">
                <div class="sign-form">

                  <form action="/user" method="post">
                    <div class="row">
                      <div class="login-logo text-center">
                        <a href="../../index2.html">
                          <img src="/img/LogoL.png" alt />
                        </a>
                      </div>
                      <div class="form-heading">
                        <h1>DNA Registration</h1>
                      </div>
                      <div class="form-subheading">
                        <p>Please Enter Your Registration Info</p>
                      </div>
                      <div class="form-group">
                        <input
                          :class="{'border-warning':errors.name}"
                          class="form-control"
                          id="Name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          v-model="list.name"
                        />
                        <small class="text-warning" v-if="errors.name">{{errors.name[0]}}</small>
                      </div>

                      <div class="form-group">
                        <input
                          :class="{'border-warning':errors.email}"
                          class="form-control"
                          id="Email"
                          name="email"
                          placeholder="Email"
                          type="text"
                          v-model="list.email"
                        />
                        <small class="text-warning" v-if="errors.email">{{errors.email[0]}}</small>
                      </div>
                      <div class="form-group">
                        <input
                          :class="{'border-warning':errors.password}"
                          class="form-control"
                          id
                          name="password"
                          placeholder="Password"
                          type="password"
                          v-model="list.password"
                        />
                        <small class="text-warning" v-if="errors.password">{{errors.password[0]}}</small>
                      </div>
                      <div class="form-group">
                        <input
                          :class="{'border-warning':errors.password_confirmation}"
                          class="form-control"
                          name="password_confirmation"
                          placeholder="Confirm Password"
                          type="password"
                          v-model="list.password_confirmation"
                        />
                        <small
                          class="text-warning"
                          v-if="errors.password_confirmation"
                        >{{errors.password_confirmation[0]}}</small>
                      </div>

                      <small class="text-warning" v-if="errors.agreed">{{errors.agreed[0]}}</small>
                      <Checkbox v-model="list.agreed" :class="{'border-warning':errors.agreed}">
                        I agree to
                        <router-link to="/articles/user-agreement">
                          Service Provider's User
                          Agreement
                        </router-link>and
                        <router-link to="/articles/privacy-policy">Privacy Policy</router-link>
                      </Checkbox>

                      <!--<Button style="border-radius: 0px" type="info">Cancel</Button>-->
                      <Button
                        :loading="loading"
                        @click="userExistWithoutSocial"
                        style="border-radius: 0px"
                        type="info"
                      >
                        <span v-if="!loading">Create Account</span>
                        <span v-else>Registering ..</span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-7"
            style="background-image: url('/img/bg-4.jpg'); background-repeat: no-repeat;
  background-size: cover"
          >
            <div class="right-panel parent fr-height">
              <div class="signup-box col-sm-4 child">
                <h2>Log In</h2>
                <p>
                  Please Register to Reveal Your Own!.
                </p>
                <router-link to="/user/login">
                  <Button ghost style="border-radius: 0px" type="default">Log In</Button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreed: "",
        comName: "",
        desigNation: "",
        areaCode: ""
      },
      errors: {},
      userinfo: {},
      signUpStatus: 0,
      loding: false,
      loading: false
    };
  },
  methods: {
    userExistWithoutSocial() {
      //alert('hi');
      console.log(this.list.email);
      if (this.list.email) {
        //alert('ase');
        axios
          .get("/admin/user-exist/" + this.list.email)
          .then(res => {
            //this.signUpStatus = res.data;
            if (res.data === 1) {
              this.$Message.config({
                top: 200
              });
              const msg = this.$Message.loading({
                content: "Already Exist; Redirected to Log In Page",
                duration: 0
              });
              setTimeout(msg, 3000);
              this.$router.push({ name: "Login" });
              // window.location.href = "/user/login";
            } else {
              this.register();
            }
          })
          .catch(error => (this.errors = error.response.data.errors));
      } else {
        //alert('nai');
        this.register();
      }
    },
    register() {
      // console.log(this.list);
      this.loading = true;
      //this.userExist(this.list.email);

      axios
        .post("/admin/user", this.$data.list)
        .then(res => {
          //console.log(res);
          /* let token = res.data.token;
                         localStorage.setItem("token", token);*/

          this.userinfo.name = this.list.name;
          this.userinfo.email = this.list.email;
          this.userinfo.password = this.list.password;

          this.login();
          //this.registerConf();
        })
        .catch(e => {
          this.loading = false;
          this.errors = e.response.data.errors;
        });
      //console.log(this.userinfo);
      //console.log(this.errors);
    },

    login: function() {
      axios
        .post("/login", this.$data.userinfo)
        .then(res => {
          //console.log(res);
          this.loading = false;
          window.location.href = "/admin";
        })
        .catch(error => (this.errors = error.response.data.errors));
      //console.log(this.$data.errors);
    }
  }
};
</script>

<style scoped>
</style>
