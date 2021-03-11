import connect from '../../store/connect'

const mapStateToProps = (state) => {
  if (!(state.location && state.current)) {
    return {
      isReady: false,
    }
  }

  return {
    isReady: true,
    locale: state.locale,
    unitTemp: state.unitTemp,
    city: state.location.city,
    country: state.location.country,
    temp: state.current[`temp_${state.unitTemp}`],
    icon: state.current.condition.icon,
    text: state.current.condition.text,
    feelslike: state.current[`feelslike_${state.unitTemp}`],
    wind: state.current.wind_kph,
    humidity: state.current.humidity,
    pressure: state.current.precip_mm,
  }
}

export default connect(mapStateToProps)
