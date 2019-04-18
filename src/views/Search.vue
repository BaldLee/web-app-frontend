<template>
  <div class="search">
    <input v-model="searchword" class="searchbar" placeholder=" Search...">
    <el-table
      :data="bookintable"
      style="width: 100%"
      :default-sort="{prop: 'name', order: 'descending'}"
      @row-click="tableclick"
    >
      <el-table-column prop="name" label="名称" sortable width="400"></el-table-column>
      <el-table-column prop="author" label="作者" sortable width="400"></el-table-column>
      <el-table-column prop="ISBN" label="ISBN" sortable width="350"></el-table-column>
    </el-table>
    <BookDetail :isvisible.sync="detailvisible"></BookDetail>
  </div>
</template>

<script>
import BookDetail from "@/components/BookDetail.vue";
export default {
  name: "Search",
  components: {
    BookDetail
  },
  data: function() {
    return {
      searchword: "",
      books: this.$global.books,
      bookintable: this.$global.books,
      detailvisible: false
    };
  },
  methods: {
    tableclick(row) {
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].ISBN === row.ISBN) {
          this.showdetail(this.books[i]);
          return;
        }
      }
    },
    showdetail: function(book) {
      this.$global.bookdetail = book;
      this.detailvisible = true;
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