import React from 'react'
import { Tab, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";


const Nav = props => (
	<NavLink
		exact
		{...props}
		activeClassName="active"
	/>
);

const createLabel = (iconName, labelText) => <span><Icon name={iconName} />{labelText}</span>

const homeLabel = createLabel("", "Explore")
const userLabel = createLabel("", "My Page")

const panes = [
  { menuItem: <Menu.Item style={{width: '50%', height: '50px', marginTop: '40px', fontSize: '18px'}} key='home' as={Nav} to={`/`} content={homeLabel} /> },
  { menuItem: <Menu.Item style={{width: '50%', height: '50px', marginTop: '40px', fontSize: '18px'}} key='user' as={Nav} to={`/user`} content={userLabel} /> },

]

const TabNav = () => <Tab panes={panes} renderActiveOnly={false} />

export default TabNav