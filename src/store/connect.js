import store, { dispatch } from './store'

const noop = () => { }

function connect(_mapStateToProps, _mapDispatchToProps) {
  const mapStateToProps = _mapStateToProps || noop
  const mapDispatchToProps = _mapDispatchToProps || noop

  return (Component) => {
    const wrapper = (...args) => {
      const renderComponent = Component(...args)

      const render = () => {
        const props = {
          ...mapStateToProps(store.getState()),
          ...mapDispatchToProps(dispatch.bind(store)),
        }

        renderComponent(props)
      }

      store.subscribe(render)
    }

    return wrapper
  }
}

export default connect
