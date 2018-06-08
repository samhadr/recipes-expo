import { Auth } from 'aws-amplify';
// import { withNavigation } from 'react-navigation';

const userSignOut = () => {
  Auth.signOut()
  .then(data => console.log(data))
  .then(() => this.props.screenProps.authenticate(false))
  .then(this.props.navigation.navigate('SignIn'))
  .catch(err => {
    console.log(`sign out ERROR: ${err.message}`, err)
  });
}

export const onChangeText = (key, value) => {
  this.setState({
    [key]: value
  });
}

export default userSignOut;
