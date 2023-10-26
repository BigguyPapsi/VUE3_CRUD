<template>
  <div style="display: flex; justify-content: center">
    <div class="card mt-5" style="width: 500px">
      <div class="card-body">
        <div style="display: flex; justify-content: space-between">
          <h1>Add new currency</h1>
          <router-link
            to="/currency"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></router-link>
        </div>

        <form @submit.prevent="onSubmit" class="mt-5">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Currency name</label
            >
            <input
              type="text"
              v-model="curName"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Add your currency name here"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Image</label>

            <input
              type="file"
              class="form-control"
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
          <div style="display: flex; justify-content: center; margin-top: 60px">
            <button type="submit" class="btn btn-outline-primary">
              Submit
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
      selectedFile: null,
      curName: "",
    };
  },

  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      console.log("Selected file:", this.selectedFile);
    },

    save() {
      if (this.items !== null && this.selectedFile !== null) {
        this.saveData();
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "ໃສ່ຂໍ້ມູນບໍ່ຄົບ !",
          // text: "error !",
          showConfirmButton: false,
          iconColor: "#f8bb86",
          width: 600,
          padding: "3em",
          timer: 1500,
        });
      }
    },
    onSubmit(even) {
      even.preventDefault();
      this.save();
    },

    saveData() {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      // formData.append("_method", "PATH");
      formData.append("curName", this.curName);
      formData.append("Curency", this.selectedFile);
      Authorization: "Bearer " + JSON.parse(token);

      axios
        .post("currency/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then(({ data }) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ບັນທຶກຂໍ້ມູນສຳເລັດ !",
            text: "Successful !",
            showConfirmButton: false,
            iconColor: "limegreen",
            width: 600,
            padding: "3em",
            timer: 1500,
          });
          this.$router.push({ path: "/currency" });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
