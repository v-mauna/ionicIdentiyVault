import { connect } from 'react-redux';
import { getShowPinDialog, getIsSetApplicationPinMode } from '../store';
import PinEditorModal from '../components/PinEditorModal';

const mapStateToProps = (state: any) => ({
  isOpen: getShowPinDialog(state),
  setPasscode: getIsSetApplicationPinMode(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  onDidDismiss: () => console.log('did dismiss...')
});

export default connect(mapStateToProps, mapDispatchToProps)(PinEditorModal);
