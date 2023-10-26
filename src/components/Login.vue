<template>
  <div class="container_style">
    <div
      class="card card_style"
      style="
        padding: 20px 60px 0 60px;
        filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.125));
      "
    >
      <div class="card-body">
        <h1 style="display: flex; justify-content: center; margin-bottom: 3%">
          <b>Login</b>
        </h1>

        <form @submit.prevent="logIn">
          <div class="input-group mb-5" style="margin-top: 50px">
            <span class="input-group-text" id="basic-addon1"
              ><ion-icon name="person-outline"></ion-icon
            ></span>
            <input
              type="text"
              v-model="login.username"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <input
              type="password"
              v-model="login.password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
            <!-- <h1>{{ messages }}</h1> -->
          </div>

          <div style="display: flex; margin-top: 50px">
            <button
              type="submit"
              class="btn btn-primary btn-style"
              style="width: 100%"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../base_api";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      items: "",
      login: { username: "", password: "" },
      // messages: "",
    };
  },

  mounted() {},

  methods: {
    logIn() {
      axios
        .post("authen/login", this.login)
        .then((response) => {
          this.messages = response.data.message;
          let savetoken = response.data.access_token;
          localStorage.setItem("token", JSON.stringify(savetoken));

          axios
            .get("currency/all", {
              headers: {
                "ngrok-skip-browser-warning": true,
                Authorization: "Bearer " + savetoken,
              },
            })
            .then((res) => {
              res.data;
            });

          if (response.data.message) {
            // alert(response.data.message);

            Swal.fire({
              position: "center",
              icon: "warning",
              title: "User ຂອງທ່ານບໍ່ມີໃນລະບົບ",
              // text: messages,
              showConfirmButton: false,
              iconColor: "#f8bb86",
              width: 600,
              padding: "3em",
              timer: 1500,
            });
          } else {
            this.$router.replace("/currency");
          }
        })
        .catch((res) => {
          alert(res.data.message);
        });
    },
  },
};
</script>

<style>
.card_style {
  width: 510px;
  height: 450px;
}

.container_style {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.btn-style {
  color: aliceblue;
}
</style>
