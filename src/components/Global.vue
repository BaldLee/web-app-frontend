<script>
var books = [
  {
    no: 1,
    name: "The_Man_Who_Changed_China",
    imgsrc: require("../assets/The_Man_Who_Changed_China.jpg"),
    rawimg: '<img src="../assets/The_Man_Who_Changed_China.jpg">',
    author: "罗伯特·劳伦斯·库恩",
    ISBN: "7-5327-3655-5/K·154"
  },
  {
    no: 2,
    name: "Computer Systems A Programmer's Perspective 3rd",
    imgsrc: require("../assets/csapp.jpg"),
    rawimg: '<img src="../assets/csapp.jpg">',
    author: "兰德尔 E. 布莱恩特",
    ISBN: "978-7-111-56127-9"
  },
  {
    no: 3,
    name: "C++ Primer",
    imgsrc: require("../assets/cppp.jpg"),
    rawimg: '<img src="../assets/cppp.jpg">',
    author: "Stanley B. Lippman",
    ISBN: "978-7-121-15535-2"
  },
  {
    no: 4,
    name: "Database System Concepts 6th",
    imgsrc: require("../assets/dsc.jpg"),
    rawimg: '<img src="../assets/dsc.jpg">',
    author: "Abraham Silberschatz",
    ISBN: "978-7-04-031175-4"
  }
];
var username = "";
var bookdetail = {
  no: "",
  name: "",
  imgsrc: "",
  rawimg: "",
  author: "",
  ISBN: ""
};
var mycart = [];
var bookinfo;
export default {
  books,
  username,
  bookdetail,
  mycart,
  bookinfo
};
</script>
