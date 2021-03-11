import connect from '../../store/connect'

const mapStateToProps = (state) => ({
  locale: state.locale,
  lng: state.location ? state.location.lng : 0,
  lat: state.location ? state.location.lat : 0,
})

export default connect(mapStateToProps)
