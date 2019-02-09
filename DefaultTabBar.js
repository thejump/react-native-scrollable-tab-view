const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./Button');

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    let count, split = (name || "").split("^"), Badge,BadgeHidden,Inner,hiddenStyle,color
    if (split.length > 1) {
    color=split[1]
      count = split[2]
    }
    if (count) {
      //hidden is for centering purposes
      let badgeStyle = {
        height: 18,
        backgroundColor:color,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:4,
        marginBottom:16,
      }
      if ((count + "").length == 1) {
        badgeStyle.width = 18
        badgeStyle.paddingLeft=1
      }
      else{
        badgeStyle.paddingHorizontal=4
      }
      hiddenStyle=JSON.parse(JSON.stringify(badgeStyle))
      hiddenStyle.backgroundColor='white'
      hiddenStyle.marginRight=4
      hiddenStyle.marginLeft=0
      Badge = <View style={badgeStyle}>
        <Text style={{ color: "white", fontFamily: "AvenirNext-Medium", fontSize: 13 }}>{count}</Text>
      </View>
      BadgeHidden = <View style={hiddenStyle}>
        <Text style={{ color: "white", fontFamily: "AvenirNext-Medium", fontSize: 13 }}>{count}</Text>
      </View>
      Inner=<View style={{flexDirection:'row',alignItems:'flex-end'}}>
        {BadgeHidden}
        <Text style={[{color: textColor, fontWeight}, textStyle ]}>
          {split[0]}
        </Text>
        {Badge}
      </View>
    }
    else{
      Inner=  <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
        {name}
      </Text>
    }

    return <Button
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        {Inner}
      </View>
    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = DefaultTabBar;
