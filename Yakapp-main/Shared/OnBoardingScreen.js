import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const storeData = async value => {
  try {
    await AsyncStorage.setItem('onBoarding', value);
  } catch (e) {}
};

const storeNote = async value => {
  try {
    await AsyncStorage.setItem('note', value);
  } catch (e) {}
};

const slides = [
  {
    id: 1,
    image: require('../Assets/features.png'),
    title: 'Interactive Features',
    subtitle:
      'Yakapp offers amazing features including OCR-Scanning, Dictionaries, Text-translator and many more.',
  },
  {
    id: 2,
    image: require('../Assets/lessons.png'),
    title: 'Up-to-date Lessons',
    subtitle: 'Catch up with our latest lessons about Yakan.',
  },
  {
    id: 3,
    image: require('../Assets/communication.png'),
    title: 'Communication',
    subtitle:
      'Improve vocabulary skills and learn to communicate in Yakan language.',
  },
];

const Slide = ({item}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: '100%',
      }}>
      <Image
        source={item?.image}
        style={{height: '70%', width, resizeMode: 'contain'}}
      />
      <View style={{width: width - 40}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnBoardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: '#fff',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 45, borderRadius: 100}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.replace('TabScreen');
                  storeData('no');
                  storeNote([{}]);
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 15,
                    color: '#272727',
                    textTransform: 'capitalize',
                  }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="#407BFF" />

      <LinearGradient
        colors={['#407BFF', '#40C6FF']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        style={{flex: 1}}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{height: height * 0.75}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 5,
    width: 10,
    backgroundColor: '#8DD4F2',
    marginHorizontal: 3,
    borderRadius: 2,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 45,
  },
});

export default OnBoardingScreen;
