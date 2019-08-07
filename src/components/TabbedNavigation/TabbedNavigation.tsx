import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './TabbedNavigation.scss';

type TabbedNavigationProps = {
	tabs: {
		title?: string,
		data: React.ReactNode
	}[]
};

class TabbedNavigation extends React.PureComponent<TabbedNavigationProps, {}> {
	renderTitles = () =>
		this.props.tabs.map(tab => (
			<Tab styleName="tabbed-nav-title" key={`tab-${tab.title}`}>
				{tab.title}
			</Tab>
		));
	renderContent = () =>
		this.props.tabs.map(tab => (
			<TabPanel styleName="tabbed-nav-panel" key={`data-${tab.title}`}>
				{tab.data}
			</TabPanel>
		));
	render() {
		return (
			<Tabs>
				<TabList styleName="hide">{this.renderTitles()}</TabList>
				{this.renderContent()}
			</Tabs>
		);
	}
}

export default CSSModules(TabbedNavigation, styles, { allowMultiple: true });
