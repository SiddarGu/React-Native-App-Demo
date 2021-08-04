// React & React Native
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  Fragment,
} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

// Third-party
import { observer } from 'mobx-react';
import {
  Divider,
  useTheme,
  Title,
  Subheading,
  Portal,
  Dialog,
  Button,
  Surface,
  Text,
} from 'react-native-paper';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';

// Constants

// Custom Components
import ThickDivider from '@components/ThickDivider';
import ThemedIcon from '@components/ThemedIcon';

export default Numpad = ({ onHide, onSubmit, price, originalPrice }) => {
  const { translations } = useTranslation();
  const { colors, fonts } = useTheme();
  const {} = useStores();
  const originalPriceRef = useRef(null);
  const originalPriceTextRef = useRef(originalPrice);
  const [formattedOriginalPriceText, setFormattedOriginalPriceText] =
    useState('');
  const priceRef = useRef(null);
  const priceTextRef = useRef(price);
  const [formattedPriceText, setFormattedPriceText] = useState('');

  useEffect(() => {
    priceRef.current.focus();
    setFormattedOriginalPriceText(currencyFormat(originalPrice));
    setFormattedPriceText(currencyFormat(price));
  }, []);

  const currencyFormat = num => {
    if (num.length === 0) return '';
    return '$' + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const add = value => {
    const re = /^[0-9]{0,9}(\.[0-9]{0,2})?$/;
    if (originalPriceRef.current.isFocused()) {
      const prev = originalPriceTextRef.current;
      const p = prev + value;
      if (p.match(re)) {
        originalPriceTextRef.current = p;
      }

      setFormattedOriginalPriceText(
        currencyFormat(originalPriceTextRef.current)
      );
    } else {
      const prev = priceTextRef.current;
      const p = prev + value;
      if (p.match(re)) {
        priceTextRef.current = p;
      }
      setFormattedPriceText(currencyFormat(priceTextRef.current));
    }
  };

  const remove = () => {
    if (originalPriceRef.current.isFocused()) {
      originalPriceTextRef.current = originalPriceTextRef.current.slice(0, -1);
      setFormattedOriginalPriceText(
        currencyFormat(originalPriceTextRef.current)
      );
    } else {
      priceTextRef.current = priceTextRef.current.slice(0, -1);
      setFormattedPriceText(currencyFormat(priceTextRef.current));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <ThickDivider />
        <TouchableWithoutFeedback onPress={() => priceRef.current.focus()}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Title> 价格 </Title>
            <TextInput
              showSoftInputOnFocus={false}
              contextMenuHidden
              ref={priceRef}
              style={[
                {
                  color: colors.text,
                  fontFamily: fonts.regular.fontFamily,
                  fontWeight: fonts.regular.fontWeight,
                },
                styles.input,
              ]}
              value={formattedPriceText}
            />
          </View>
        </TouchableWithoutFeedback>

        <ThickDivider />
        <TouchableWithoutFeedback
          onPress={() => originalPriceRef.current.focus()}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Title> 原价 </Title>
            <TextInput
              showSoftInputOnFocus={false}
              contextMenuHidden
              ref={originalPriceRef}
              style={[
                {
                  color: colors.text,
                  fontFamily: fonts.regular.fontFamily,
                  fontWeight: fonts.regular.fontWeight,
                },
                styles.input,
              ]}
              value={formattedOriginalPriceText}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.numPadWrapper}>
        <View style={styles.column}>
          {['1', '4', '7', '.'].map(value => (
            <Fragment key={value}>
              <ThickDivider />
              <TouchableOpacity style={styles.grid} onPress={() => add(value)}>
                <Title> {value} </Title>
              </TouchableOpacity>
            </Fragment>
          ))}
          <ThickDivider />
        </View>

        <ThickDivider vertical />

        <View style={styles.column}>
          {['2', '5', '8', '0'].map(value => (
            <Fragment key={value}>
              <ThickDivider />
              <TouchableOpacity style={styles.grid} onPress={() => add(value)}>
                <Title> {value} </Title>
              </TouchableOpacity>
            </Fragment>
          ))}
          <ThickDivider />
        </View>

        <ThickDivider vertical />

        <View style={styles.column}>
          {['3', '6', '9'].map(value => (
            <Fragment key={value}>
              <ThickDivider />
              <TouchableOpacity style={styles.grid} onPress={() => add(value)}>
                <Title> {value} </Title>
              </TouchableOpacity>
            </Fragment>
          ))}
          <ThickDivider />
          <TouchableOpacity style={styles.grid} onPress={() => onHide()}>
            <ThemedIcon mode="MaterialIcon" name="keyboard-hide" size={25} />
          </TouchableOpacity>
          <ThickDivider />
        </View>

        <ThickDivider vertical />

        <View style={styles.column}>
          <ThickDivider />
          <TouchableOpacity style={styles.grid} onPress={() => remove()}>
            <ThemedIcon mode="MaterialIcon" name="backspace" size={30} />
          </TouchableOpacity>
          <ThickDivider />

          <TouchableOpacity
            style={styles.grid}
            onPress={() => {
              onSubmit(priceTextRef.current, originalPriceTextRef.current);
              onHide();
            }}>
            <Title>{translations['confirm']}</Title>
          </TouchableOpacity>
          <ThickDivider />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15
  },

  numPadWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  column: {
    flex: 1,
  },

  grid: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  inputWrapper: {
    marginHorizontal: 15,
  },
  input: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingLeft: 22,
    fontSize: 18,
  },
});
