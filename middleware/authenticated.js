export default function ({ store, redirect }) {
    if (!store.state.nav.loginAuth) {
      return redirect('/auth/login')
    }
  }