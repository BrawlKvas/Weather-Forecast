import connect from '../../store/connect'

const mapStateToProps = (state) => ({
  locale: state.locale,
  city: state.location.city,
  country: state.location.country,
  temp: state.current[`temp_${state.unitTemp}`],
  icon: state.current.condition.icon,
  text: state.current.condition.text,
  feelslike: state.current[`feelslike_${state.unitTemp}`],
  wind: state.current.wind_kph,
  humidity: state.current.humidity,
  pressure: state.current.precip_mm,
})

const f = () => {}

export default connect(mapStateToProps, f)
