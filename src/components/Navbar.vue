<template>
  <div class="nav_body"></div>
  <nav>
    <span style="margin-left: 5%"
      ><a href="#" class="nav_disable">Dashboard</a></span
    >
    <span style="margin-left: 5%"
      ><router-link to="/currency" class="nav_style"
        >Currency</router-link
      ></span
    >
    <span style="margin-left: 5%"
      ><a href="#" class="nav_disable">Report</a></span
    >
    <span style="margin-left: 5%">
      <button @click="Logout" type="button" class="btn btn-danger">
        <ion-icon name="log-out-outline"></ion-icon>
        Logout
      </button></span
    >
  </nav>
</template>

<script>
import Swal from "sweetalert2";
export default {
  methods: {
    Logout() {
      // localStorage.clear();
      // this.$router.push("/login");

      Swal.fire({
        title: "ຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່ ?",
        text: "Are you sure ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ຕົກລົງ",
        cancelButtonText: "ຍົກເລີກ",
        iconColor: "lightblue",
        width: 600,
        padding: "3em",
        position: "center",
      }).then(async (result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ດຳເນີນການສຳເລັດ !",
            text: "Successful !",
            showConfirmButton: false,
            iconColor: "limegreen",
            width: 600,
            padding: "3em",
            timer: 1500,
          });
          this.$router.push({ path: "/" });
        }
      });
    },
  },
};
</script>

<style>
nav {
  padding-top: 5px;
  background-color: rgb(57, 57, 66);
  height: 45px;
}
.nav_style {
  color: aliceblue;
  text-decoration: none;
}
.nav_disable {
  text-decoration: none;
  color: rgb(168, 168, 168);
}

.nav_style:hover {
  color: rgb(106, 83, 255);
}
</style>
