import connect from '../../store/connect'

const mapStateToProps = (state) => ({
  locale: state.locale,
  days: state.forecast ? state.forecast.forecastday : null,
  unitTemp: state.unitTemp,
})

export default connect(mapStateToProps)
