<template>
  <div id="bookmanage">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <el-table
      :data="bookintable"
      style="width: 100%"
      :default-sort="{prop: 'id', order: 'ascending'}"
      @row-click="tableclick"
    >
      <el-table-column prop="id" label="ID" sortable width="100"></el-table-column>
      <el-table-column prop="name" label="名称" sortable width="300"></el-table-column>
      <el-table-column prop="author" label="作者" sortable width="300"></el-table-column>
      <el-table-column prop="amount" label="库存" sortable width="150"></el-table-column>
      <el-table-column prop="amount" label="价格" sortable width="150"></el-table-column>
      <el-table-column prop="isbn" label="ISBN" sortable width="250"></el-table-column>
    </el-table>
    <BookEditor :thebook="booktoedit" :isvisible.sync="editorvisible"></BookEditor>
  </div>
</template>

<script>
import BookEditor from "@/components/BookEditor.vue";

export default {
  name: "BookManage",
  components: {
    BookEditor
  },
  data: function() {
    return {
      searchword: "",
      books: [],
      bookintable: [],
      booktoedit: {
        imgsrc: "",
        name: "",
        author: "",
        isbn: ""
      },
      editorvisible: false
    };
  },
  created() {
    this.fetchdata();
  },
  methods: {
    tableclick(row) {
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].id === row.id) {
          this.showeditor(this.books[i]);
          return;
        }
      }
    },
    showeditor: function(book) {
      this.booktoedit = book;
      this.editorvisible = true;
    },
    fetchdata: function() {
      this.$http
        .post("http://localhost:8082/ebook/books", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.books = response.data;
          this.bookintable = this.books;
          console.log(this.books);
        });
    }
  },
  watch: {
    searchword: function() {
      this.bookintable = [];
      for (var i = 0; i < this.books.length; i++) {
        if (
          this.books[i].name
            .toLowerCase()
            .indexOf(this.searchword.toLowerCase()) > -1
        ) {
          this.bookintable.push(this.books[i]);
        }
      }
    }
  }
};
</script>

<style scoped>
.searchbar {
  width: 200px;
  float: left;
  margin: 10px;
}
</style>
