<template>
  <div class="login-sec">
    <div class="login-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5" style="background-color: #e4effb">
            <div class="login-box parent fr-height">
              <div class="child2">
                <div class="row">
                  <div class="col-md-12">
                    <div class="login-logo text-center">
                      <a href="../../index2.html">
                        <img src="/img/LogoL.png" alt />
                      </a>
                    </div>
                    <div class="form-heading">
                      <h1>DNA Reporting Login</h1>
                    </div>
                    <div class="form-subheading">
                      <p>Please Enter your Username and Password</p>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        :class="{'border-warning':errors.email}"
                        name="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        v-model="list.email"
                      />

                      <small class="text-warning" v-if="errors.email">{{errors.email[0]}}</small>
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        :class="{'border-warning':errors.password}"
                        name="password"
                        class="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                        v-model="list.password"
                      />
                      <small class="text-warning" v-if="errors.password">{{errors.password[0]}}</small>
                    </div>
                    <div class="row">
                      <div class="col-xs-6">
                        <div class="form-check">
                          <Checkbox v-model="list.remember">Remember Me</Checkbox>
                        </div>
                      </div>
                      <div class="col-xs-6">
                        <div class="forgot-pass text-right">
                          <a href>Forget Password ?</a>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="info"
                      @click="login()"
                      style="width: 100%;border-radius: 0px"
                    >Log In</Button>
                  </div>
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
              <div class="signup-box col-md-4 child">
                <h2>Sign up</h2>
                <p>
                  Please Login to Discover YourSelf!.
                </p>
                <router-link to="/user/register">
                  <Button type="default" style="border-radius: 0px" ghost>Register Now!</Button>
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
import Register from "./Register";
export default {
  data() {
    return {
      list: {
        email: "",
        password: "",
        remember: false,
        token: ""
      },
      errors: {},
      userinfo: {},
      regShow: false,
      loginShow: true
    };
  },
  components: {
    Register: Register
  },
  methods: {
    login() {
      axios
        .post("/login", this.$data.list)
        .then(res => {
          //console.log(res);
          //this.$router.push("/admin/home");
          window.location.href = "/admin";
        })
        .catch(error => (this.errors = error.response.data.errors));
    },
    switchTo() {
      //alert('hi');
      this.loginShow = false;
      this.regShow = true;
    }
  }
};
</script>
