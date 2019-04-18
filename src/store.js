import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [
      {
        no:1,
        name: "The_Man_Who_Changed_China",
        imgsrc: "../static/The_Man_Who_Changed_China.jpg",
        rawimg:'<img src="../static/The_Man_Who_Changed_China.jpg" alt="error">',
        author: "罗伯特·劳伦斯·库恩",
        ISBN: "7-5327-3655-5/K·154"
      },
      {
        no:2,
        name: "Computer Systems A Programmer's Perspective 3rd",
        imgsrc: "../static/csapp.jpg",
        rawimg:'<img src="../static/csapp.jpg">',
        author: "兰德尔 E. 布莱恩特",
        ISBN: "978-7-111-56127-9"
      },
      {
        no:3,
        name: "C++ Primer",
        imgsrc: "../static/cppp.jpg",
        rawimg:'<img src="../static/cppp.jpg">',
        author: "Stanley B. Lippman",
        ISBN: "978-7-121-15535-2"
      },
      {
        no:4,
        name: "Database System Concepts 6th",
        imgsrc: "../static/dsc.jpg",
        rawimg:'<img src="../static/dsc.jpg">',
        author: "Abraham Silberschatz",
        ISBN: "978-7-04-031175-4"
      }
    ],
    bookintable: [
      {
        no: 1,
        name: "The_Man_Who_Changed_China",
        imgsrc: "The_Man_Who_Changed_China.jpg",
        author: "罗伯特·劳伦斯·库恩",
        ISBN: "7-5327-3655-5/K·154"
      },
      {
        no: 2,
        name: "Computer Systems A Programmer's Perspective 3rd",
        imgsrc: "../../static/csapp.jpg",
        author: "兰德尔 E. 布莱恩特",
        ISBN: "978-7-111-56127-9"
      },
      {
        no: 3,
        name: "C++ Primer",
        imgsrc: "../../static/cppp.jpg",
        author: "Stanley B. Lippman",
        ISBN: "978-7-121-15535-2"
      },
      {
        no: 4,
        name: "Database System Concepts 6th",
        imgsrc: "../../static/dsc.jpg",
        author: "Abraham Silberschatz",
        ISBN: "978-7-04-031175-4"
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
