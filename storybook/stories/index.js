import React from 'react';
import { Tex, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

// eslint-disable-next-line import/extensions
import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import ButtonDropdown from './ButtonDropdown';

storiesOf('Welcome', module).add('to Storybook', () => (
	<Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
	.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
	.addDecorator(withKnobs)
	.add('with text', () => (
		<Button
			onPress={action('clicked-text')}
			disabled={boolean('Disabled', false)}
		>
			<Text>{text('Label', 'Hello Storybook')}</Text>
		</Button>
	))
	.add(
		'with some emoji',
		() => (
			<Button
				onPress={action('clicked-emoji')}
				disabled={boolean('Disabled', false)}
			>
				<Text>😀 😎 👍 💯</Text>
			</Button>
		),
		{ notes: 'A very simple button component' }
	);

storiesOf('ButtonDropdown', module)
	.addDecorator(getStory => (
		<View
			style={{
				paddingTop: 200,
				alignItems: 'center',
				backgroundColor: '#F5FCFF',
				flex: 1
			}}
		>
			{getStory()}
		</View>
	))
	.addDecorator(withKnobs)
	.add('with text', () => (
		<ButtonDropdown onPress={action('clicked-button')}></ButtonDropdown>
	));
