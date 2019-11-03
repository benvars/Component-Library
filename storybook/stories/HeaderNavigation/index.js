// @flow

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

const HEADER_MARGIN = 20;
const HEADER_BACKGROUND_PADDING = 15;
const backgroundPosition = new Animated.Value(0);

class HeaderNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			widths: {},
			height: 0
		};
	}

	componentDidMount() {
		Animated.timing(backgroundPosition, {
			toValue: this.getBackgroundPosition(this.state.activeIndex),
			duration: 300
		}).start();
	}

	handleTextLayout = index => evt => {
		const newWidths = {
			...this.state.widths,
			[index]: evt.nativeEvent.layout.width
		};

		let newHeight = this.state.height;
		if (evt.nativeEvent.layout.height > this.state.height) {
			newHeight = evt.nativeEvent.layout.height;
		}
		this.setState({ widths: newWidths, height: newHeight });
	};

	getBackgroundPosition = activeIndex => {
		let position = HEADER_MARGIN;
		// sum the widths of the previous headers
		while (activeIndex > 0) {
			activeIndex -= 1;
			position += this.state.widths[activeIndex] + 2 * HEADER_MARGIN;
		}
		return position - HEADER_BACKGROUND_PADDING / 2;
	};

	selectIndex = index => {
		this.setState({
			activeIndex: index
		});
		Animated.timing(backgroundPosition, {
			toValue: this.getBackgroundPosition(index),
			duration: 300
		}).start();
	};

	renderHeaders = (header, index) => {
		const isSelected = this.state.activeIndex === index;
		return (
			<View
				key={index}
				style={{
					...styles.header,
					height: this.state.height
				}}
				onTouchEnd={() => {
					this.selectIndex(index);
				}}
			>
				<Text
					style={{
						color: isSelected ? '#121212' : '#666',
						fontWeight: 600
					}}
					onLayout={this.handleTextLayout(index)}
				>
					{header}
				</Text>
			</View>
		);
	};

	render() {
		const { headerNames } = this.props;
		return (
			<View>
				<View style={styles.headerContainer}>
					{headerNames.map(this.renderHeaders)}
				</View>
				<Animated.View
					style={{
						...styles.headerBar,
						width:
							this.state.widths[this.state.activeIndex] +
							HEADER_BACKGROUND_PADDING,
						left: backgroundPosition
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		height: 50,
		alignItems: 'center'
	},
	header: {
		fontSize: 20,
		margin: HEADER_MARGIN
	},
	headerBar: {
		height: 30,
		backgroundColor: 'white',
		position: 'absolute',
		top: 10,
		borderRadius: 10,
		zIndex: -1
	}
});

export default HeaderNavigation;
