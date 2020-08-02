export const state = () => ({
  posts: []
})

export const mutations = {
  LOAD_ALL_POSTS(state, data) {
    state.posts = data
  },
  LOAD_ALL_WP_POSTS(state, data) {
    state.posts = data
  },
  REMOVE_ALL_POSTS(state) {
    state.posts = []
  }
}

export const actions = {
  async addAxiosPost(context) {
    const token = localStorage.getItem('auth._token.local')

    if (token === 'false') {
      return
    }

    const data = {
      title: 'axios',
      content: 'test',
      status: 'draft'
    }

    this.$axios.setHeader('Content-Type', 'application/json')
    this.$axios.setHeader('accept', 'application/json')
    this.$axios.setHeader('Authorization', token)
    const response = await this.$axios.post(
      'http://127.0.0.1/web/wp-json/wp/v2/posts',
      data
    )

    console.log(response)
  },
  addFetchPost(context, data) {
    const token = localStorage.getItem('auth._token.local')

    if (token === 'false') {
      return
    }

    fetch('http://127.0.0.1/web/wp-json/wp/v2/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        title: 'New post',
        content: JSON.stringify('test'),
        status: 'draft'
      })
    }).then(function(response) {
      return response.json()
    })
  },
  async loadAllPostsBtn(context) {
    const data = await fetch('http://127.0.0.1/web/wp-json/wp/v2/posts')
    const response = await data.json()
    context.commit('LOAD_ALL_WP_POSTS', response)
  },
  async loadAllPostsBtnAxios(context) {
    const response = await this.$axios.get(
      'http://127.0.0.1/web/wp-json/wp/v2/posts'
    )
    context.commit('LOAD_ALL_WP_POSTS', response.data)
  },
  async loadAllPosts({ commit }) {
    const response = await this.$axios.get(
      'http://127.0.0.1/web/wp-json/wp/v2/posts'
    )

    commit('LOAD_ALL_WP_POSTS', response.data)
  },
  async filterPostsAuthor({ commit }, data) {
    const response = await this.$axios.get(
      'http://127.0.0.1/web/wp-json/wp/v2/posts?author=' + data
    )

    commit('LOAD_ALL_WP_POSTS', response.data)
  }
}
