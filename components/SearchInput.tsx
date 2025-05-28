import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useThemeStore} from '../store/useThemeStore'

type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  onFilterPress?: () => void // kept for future use, not currently used
}

export const SearchInput = ({value, onChange, placeholder = 'Search...'}: Props) => {
  const {theme} = useThemeStore()

  return (
    <View
      style={[styles.container, {borderColor: theme.border, backgroundColor: theme.background}]}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        accessibilityLabel={placeholder}
        accessibilityRole="search"
        style={[styles.input, {color: theme.text}]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      <Ionicons name="filter" testID="filter-icon" size={20} color="gray" style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 8
  },
  icon: {
    marginLeft: 8
  }
})
