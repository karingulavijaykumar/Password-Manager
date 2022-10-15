import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// const App = () => <div>Hello World</div>

class App extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    allWebsitesPasswords: [],
    showPasswordStatus: false,
    searchInput: '',
  }

  takingWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  takingUserName = event => {
    this.setState({userName: event.target.value})
  }

  takingPassword = event => {
    this.setState({password: event.target.value})
  }

  registeringWebsitePassword = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const newWebsitePasswordData = {id: uuidv4(), website, userName, password}
    this.setState(prevState => ({
      website: '',
      userName: '',
      password: '',
      allWebsitesPasswords: [
        ...prevState.allWebsitesPasswords,
        newWebsitePasswordData,
      ],
    }))
    console.log('newWebsitePassword')
    console.log(newWebsitePasswordData)
  }

  toggleShowPasswordStatus = () => {
    this.setState(prevState => ({
      showPasswordStatus: !prevState.showPasswordStatus,
    }))
  }

  takingSearchString = event => {
    this.setState({searchInput: event.target.value})
  }

  filteringOfSearchInput = () => {
    const {allWebsitesPasswords, searchInput} = this.state
    return allWebsitesPasswords.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  deletePasswordItem = id => {
    console.log(id)
    this.setState(prevState => ({
      allWebsitesPasswords: prevState.allWebsitesPasswords.filter(
        each => each.id !== id,
      ),
    }))
  }

  render() {
    const {
      website,
      userName,
      password,
      allWebsitesPasswords,
      showPasswordStatus,
    } = this.state

    const passwordsItemToDisplay = this.filteringOfSearchInput()

    return (
      <div className="page">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="input-section">
          <div className="sm-input-section-img-container">
            <img
              className="sm-input-section-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
          <form className="form" onSubmit={this.registeringWebsitePassword}>
            <h1 className="form-head">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Website"
                onChange={this.takingWebsiteName}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Username"
                onChange={this.takingUserName}
                value={userName}
              />
            </div>
            <div className="input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="input-field"
                type="password"
                placeholder="Enter Password"
                onChange={this.takingPassword}
                value={password}
              />
            </div>
            <div className="form-button-container">
              <button className="form-button" type="submit">
                Add
              </button>
            </div>
          </form>
          <div className="lg-input-image-container">
            <img
              className="lg-input-section-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>

        <div className="output-section-container">
          <div className="output-top-bar-container">
            <div className="output-hed-and-count-container">
              <h1>Your Passwords</h1>
              <p className="count">{allWebsitesPasswords.length}</p>
            </div>
            <div className="search-input-container">
              <img
                className="input-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="search-field"
                type="search"
                placeholder="search"
                onChange={this.takingSearchString}
              />
            </div>
          </div>
          <div className="checkbox-input-container">
            <input
              id="search input"
              type="checkbox"
              onChange={this.toggleShowPasswordStatus}
            />
            <label htmlFor="search input">Show passwords</label>
          </div>
          {passwordsItemToDisplay.length !== 0 ? (
            <ul className="passwordItemsContainer">
              {passwordsItemToDisplay.map(each => {
                const deleteClicked = () => {
                  this.deletePasswordItem(each.id)
                }
                const randomColors = [
                  '#f97316',
                  '#b91c1c',
                  '#b6c3ca',
                  '#0b69ff',
                  '#f59e0b',
                  '#10b981',
                  '#000000',
                  '#14b8a6',
                  '#0ea5e9',
                  '#64748b',
                ]
                return (
                  <li className="password-item" key={each.id}>
                    <h1
                      style={{
                        background:
                          randomColors[allWebsitesPasswords.indexOf(each) % 10],
                      }}
                      className="passwordItemLetter"
                    >
                      {each.website.slice(0, 1).toUpperCase()}
                    </h1>
                    <div className="passwordItemDetails">
                      <p>{each.website}</p>
                      <p>{each.userName}</p>
                      {showPasswordStatus ? (
                        <p>{each.password}</p>
                      ) : (
                        <img
                          className="stars-image"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                    </div>
                    <div>
                      <button
                        className="delete-button"
                        testid="delete"
                        type="button"
                        onClick={deleteClicked}
                      >
                        <img
                          className="delete-image"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                          alt="delete"
                        />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>
              <div className="no-contents-image-container">
                <img
                  className="no-contents-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
              </div>
              <p className="no-pswrd-text">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
