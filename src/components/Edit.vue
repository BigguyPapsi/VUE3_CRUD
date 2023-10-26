<template>
  <div>
    <div style="display: flex; justify-content: center">
      <div class="card mt-5" style="width: 500px">
        <div class="card-body">
          <div style="display: flex; justify-content: space-between">
            <h1>Edit</h1>
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
                v-model="name"
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
            <div
              style="display: flex; justify-content: center; margin-top: 60px"
            >
              <button type="submit" class="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
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
      currencys: [],
      id: "",
      selectedFile: "",
      name: "",
      imagefile: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    save() {
      if (this.items !== null) {
        this.saveData();
      }

      if (this.items !== null || this.selectedFile !== null) {
        this.saveData();
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "ຍັງບໍ່ທັນໃສ່ຂໍ້ມູນ !",
          text: "error !",
          showConfirmButton: false,
          iconColor: "yellow",
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
      // formData.append("_method", "put");
      formData.append("id", this.$route.params.id);
      formData.append("name", this.name);
      formData.append("Curency", this.selectedFile);
      // if (this.selectedFile != null || this.selectedFile != "") {
      //   formData.append("Curency", this.selectedFile);
      // }

      const token = localStorage.getItem("token");
      axios
        .put("currency/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then(({ data }) => {
          console.log(this.$route.params.id, JSON.parse(token));
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

          setTimeout(() => {
            // window.location.reload();
          }, 1000);
          this.$router.push({ path: "/currency" });
        });
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("currency/all", {
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + JSON.parse(token),
        },
      })
      .then((res) => {
        this.currencys = res.data.data_detail;
        console.log(this.$route.params.id);
        //  console.log(this.currencys);

        for (const currency of this.currencys) {
          if (currency.cur_id == this.$route.params.id) {
            console.log("id====", currency.cur_id);
            this.imagefile = currency.image;
            this.name = currency.cur_name;
            // console.log("Selected Currency Name:", this.name);
            // console.log("Selected Currency Image:", this.imagefile);
            break;
          }
        }
      });
  },
};
</script>

<style></style>
