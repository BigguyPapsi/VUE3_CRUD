<template>
  <div style="display: flex; justify-content: center">
    <div class="card mt-5" style="width: 700px">
      <div class="card-body">
        <h2 class="mt-5 mb-5">Currency menagement</h2>
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="currency"
          item-value="name"
          class="elevation-1"
        >
          <template v-slot:item.option="{ item }">
            <span>
              <router-link
                class="btn btn-outline-warning"
                :to="{ name: 'Edit', params: { id: item.cur_id } }"
                > <b><ion-icon name="create-outline"></ion-icon></b> Edit
              </router-link>
            </span>

            <span>
              <button
                type="button"
                class="btn btn-outline-danger ml-3"
                @click="deleteData(item.cur_id)"
              ><ion-icon name="trash-outline"></ion-icon>
                Delete
              </button>
            </span>
          </template>

          <template v-slot:item.image="{ item }">
            <div style="display: flex; justify-content: center">
              <img :src="item.image" />
            </div>
          </template>
        </v-data-table>

        <router-link to="/currency/crerte" class="btn btn-outline-success mt-5">
          <ion-icon name="add-outline"></ion-icon> Add new
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../base_api";
export default {
  data() {
    return {
      currency: [],
      itemsPerPage: 5,
      headers: [
        {
          title: "#ID",
          align: "center",
          key: "cur_id",
        },

        {
          title: "Flag",
          align: "center",
          key: "image",
        },
        { title: "Currency", align: "center", key: "cur_name" },

        { title: "Option", align: "center", key: "option" },
      ],
    };
  },

  methods: {
    async deleteData(id) {
      Swal.fire({
        title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
        text: "ຖ້າລົບແລ້ວຈະບໍ່ສາມາດນຳຂໍ້ມູນກັບຄືນມາໄດ້",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ລຶບ",
        cancelButtonText: "ຍົກເລີກ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("token");
          await axios.delete(`currency/delete/${id}`, {
            headers: {
              Authorization: "Bearer " + JSON.parse(token),
            },
          });

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
          // alert("User deleted!");
          // window.location.reload();
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      });

      // deleteData(id) {
      //   const token = localStorage.getItem("token");
      //   axios
      //     .delete(`currency/delete/${id}`, {
      //       headers: {
      //         Authorization: "Bearer " + JSON.parse(token),
      //       },
      //     })
      //     .then((response) => {
      //       alert("good");
      //     })
      //     .catch((error) => {
      //       alert("error");
      //     });
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
        this.currency = res.data.data_detail;
      });
  },
};
</script>

<style>
img {
  width: 35px;
}
* {
  font-family: "Noto Sans Lao Looped", sans-serif;
}
</style>
