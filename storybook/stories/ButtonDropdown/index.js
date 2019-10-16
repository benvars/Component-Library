import React, { Component } from 'react';
import {
	Image,
	View,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	Dimensions,
	Text,
	Animated,
	FlatList
} from 'react-native';

class ButtonDropdown extends Component {
	state = {
		isActive: false
	};

	toggleActiveState = () => {
		this.setState({
			isActive: !this.state.isActive
		});
	};

	renderDropdownItem = (content, index) => {
		return (
			<View
				key={index}
				style={{
					...styles.dropdownItem,
					backgroundColor: content,
					marginTop: -15,
					zIndex: content.length - index
				}}
			/>
		);
	};

	render() {
		const { onPress } = this.props;
		content = ['#0336FF', '#d602ee', '#90ee02'];
		return (
			<View style={{ alignItems: 'center' }}>
				<TouchableOpacity
					style={
						this.state.isActive
							? styles.initialButtonActive
							: styles.initialButtonInactive
					}
					onTouchStart={onPress}
					onPress={() => {
						this.toggleActiveState();
						onPress(this.state);
					}}
				>
					<Text>{this.state.isActive ? 'X' : '...'}</Text>
				</TouchableOpacity>
				{this.state.isActive
					? content.map(this.renderDropdownItem)
					: null}
			</View>
		);
	}
}

const position = new Animated.Value(0);

class InfoTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			headerWidth: 0
		};
	}

	componentDidMount() {
		const numHeaders = this.props.headers.length;
		const headerWidth = Dimensions.get('window').width / numHeaders;

		this.setState({
			headerWidth
		});
	}

	selectIndex = index => {
		this.setState({
			activeIndex: index
		});
		Animated.timing(position, {
			toValue: index * this.state.headerWidth,
			duration: 300
		}).start();
	};

	renderHeaders = (header, index) => {
		return (
			<View
				key={index}
				style={{
					...styles.header,
					width: this.state.headerWidth
				}}
				onTouchEnd={() => {
					this.selectIndex(index);
				}}
			>
				<Text>{header}</Text>
			</View>
		);
	};

	renderTabItems = content => {
		return (
			<View
				style={{
					height: 400,
					width: Dimensions.get('window').width,
					backgroundColor: content[this.state.activeIndex]
				}}
			/>
		);
	};

	render() {
		const { headers, content } = this.props;
		return (
			<View>
				<View style={styles.headerContainer}>
					{headers.map(this.renderHeaders)}
				</View>
				<Animated.View
					style={{
						...styles.headerBar,
						width: this.state.headerWidth,
						left: position
					}}
				/>
				{this.renderTabItems(content)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		height: 50
	},
	header: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerBar: {
		height: 5,
		backgroundColor: 'blue'
	},
	initialButtonInactive: {
		height: 50,
		width: 50,
		backgroundColor: '#FFDE03',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	initialButtonActive: {
		height: 50,
		width: 50,
		backgroundColor: '#FFFFFF',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dropdownItem: {
		height: 75,
		width: 75,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default ButtonDropdown;
