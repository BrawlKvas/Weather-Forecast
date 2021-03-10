import store, { dispatch } from './store'

function connect(mapStateToProps, mapDispatchToProps) {
  return (component) => {
    class Wrapper extends component {
      constructor(...args) {
        super(...args)

        store.subscribe(this.render.bind(this))
        this.render()
      }

      render() {
        // SOME CODE
        const props = {
          ...mapStateToProps(store.getState()),
          ...mapDispatchToProps(dispatch.bind(store)),
        }

        super.render(props)
      }
    }

    return Wrapper
  }
}

export default connect
