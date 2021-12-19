import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {changeAppState} from '../../features/appState';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Chapter = ({navigation, route}) => {
  const {chapter, color, key} = route.params;

  const {width} = useWindowDimensions();
  const systemFonts = [
    'Poppins-Bold',
    'Poppins-Regular',
    ...defaultSystemFonts,
  ];

  const source = {
    html: `${chapter.content}`,
  };

  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState.value);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(changeAppState('updating'));
    wait(2000).then(() => {
      dispatch(changeAppState(''));
      setRefreshing(false);
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <HeaderBack nav={navigation} border title={'Chapter ' + key} />
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={['#407BFF']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {chapter.header ? (
            <View style={styles.imageContainer}>
              <View style={styles.imageContainerAfter}></View>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  position: 'absolute',
                  zIndex: 4,
                  bottom: 20,
                  left: 20,
                  borderLeftWidth: 2,
                  borderLeftColor: '#40C6FF',
                }}>
                <Text style={styles.chapterTitleText}>{chapter.title}</Text>
              </View>
              <Image
                style={styles.imageHeader}
                source={{
                  uri: chapter.header,
                }}
              />
            </View>
          ) : null}
          <View style={styles.textContainer}>
            {/* <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#272727',
                fontSize: 16,
                textAlign: 'left',
              }}>
              {chapter.content}
            </Text> */}

            <RenderHTML
              systemFonts={systemFonts}
              source={source}
              contentWidth={width}
            />

            {chapter.reference ? (
              <View
                style={{
                  height: 'auto',
                  marginBottom: 20,
                  marginTop: 20,
                  borderTopColor: '#d3d3d3',
                  borderTopWidth: 1,
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    color: '#272727',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                  }}>
                  Reference
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {chapter.reference}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  imageContainerAfter: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    zIndex: 2,
  },

  imageHeader: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  textContainer: {
    padding: 20,
  },

  chapterTitleText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textTransform: 'capitalize',
  },

  chaptersubtitleText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
});
