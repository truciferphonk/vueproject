import Vue from 'vue'
import Vuex from 'vuex'
import image from './assets/defaultGameImage.png'
Vue.use(Vuex);

const store=new Vuex.Store({
    mutations: {
      userChange(state, newUser) {
            if(!newUser) {
                state.activeUser.username = "guest"
                state.activeUser.role = "guest"
                localStorage.removeItem("user")
                return
            }
            state.activeUser.username = newUser.username,
            state.activeUser.role = newUser.role
      }
    },
    getters: {
      username(state){
          return state.activeUser.username;
      },
      role(state) {
          return state.activeUser.role;
      }
    },
    state:{
        users:[
          {
            username:'admin',
            password:'admin123',
            role:'admin'
          },
          {
            username:'user',
            password:'user123',
            role:'user'
          }
        ],
        activeUser: { 
          username : "guest",
          role: "guest" 
        },
        deals:[
          {
            internalName: "ADDEDGAME1",
            title: "Added Game #1",
            metacriticLink: "/game/pc/added-game-1",
            dealID: "addedGameOneDealId",
            storeID: "3",
            gameID:"0293729737",
            salePrice: "7.80",
            normalPrice: "19.99",
            isOnSale: "1",
            savings: "39.020000",
            metacriticScore: "64",
            steamRatingText: "Mostly Positive",
            steamRatingPercent: "68",
            steamRatingCount: "857",
            steamAppID: "209873482346",
            releaseDate: 1502150400,
            lastChange: 1693557414,
            dealRating: '8.6',
            thumb: image
          },
          {
            internalName: "ADDEDGAME2",
            title: "Added Game #2",
            metacriticLink: "/game/pc/added-game-2",
            dealID: "addedGameTwoDealId",
            storeID: "3",
            gameID:"02937297387",
            salePrice: "7.90",
            normalPrice: "17.99",
            isOnSale: "1",
            savings: "36.020000",
            metacriticScore: "78",
            steamRatingText: "Very Positive",
            steamRatingPercent: "83",
            steamRatingCount: "852",
            steamAppID: "209873482348786",
            releaseDate: 1502150400,
            lastChange: 1693557414,
            dealRating: '8.8',
            thumb: image
          },
          {
            internalName: "ADDEDGAME3",
            title: "Added Item #3",
            metacriticLink: "/game/pc/added-game-3",
            dealID: "addedGameThreeDealId",
            storeID: "3",
            gameID:"0293729738654",
            salePrice: "5.49",
            normalPrice: "24.39",
            isOnSale: "1",
            savings: "36.020000",
            metacriticScore: "91",
            steamRatingText: "Extremely Positive",
            steamRatingPercent: "90",
            steamRatingCount: "8592",
            steamAppID: "209873482348786",
            releaseDate: 1502150400,
            lastChange: 1693557414,
            dealRating: '9.8',
            thumb: image
          },
          {
            internalName: "TITLESORTTEST",
            title: "Title Sort Test",
            metacriticLink: "/game/pc/title-sort-test",
            dealID: "titleSortTestDealId",
            storeID: "3",
            gameID:"029372973sru4",
            salePrice: "5.49",
            normalPrice: "24.39",
            isOnSale: "1",
            savings: "36.020000",
            metacriticScore: "91",
            steamRatingText: "Extremely Positive",
            steamRatingPercent: "90",
            steamRatingCount: "8592",
            steamAppID: "2098734823487868s",
            releaseDate: 1502150400,
            lastChange: 1693557414,
            dealRating: '9.8',
            thumb: image
          }
        ],
        header:
        {
          title: "Cheap Lion",
          paragraph: "Shop in style"
        }
    }
})

export default store;