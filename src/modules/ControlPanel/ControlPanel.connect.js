import connect from '../../store/connect'
import { changeLocale, changeLocation, changeUnitTemp } from '../../store/thunks'

const mapStateToProps = (state) => ({
  locale: state.locale,
  unitTemp: state.unitTemp,
})

const mapDispatchToProps = (dispatch) => ({
  changeLocale: (locale) => dispatch(changeLocale(locale)),
  changeUnitTemp: (unit) => dispatch(changeUnitTemp(unit)),
  changeLocation: (query) => dispatch(changeLocation(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)
