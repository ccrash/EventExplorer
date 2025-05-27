import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useEventStore } from '../store/useEventStore'
import { useToggleInterest } from '../hooks/useEventActions'
import { useThemeStore } from '../store/useThemeStore'

type Props = {
  eventId: string
}

export const InterestButton = ({ eventId }: Props) => {
  const { interestingIds } = useEventStore() 
  const { theme } = useThemeStore()

  const isInterested = interestingIds.has(eventId)
  const { toggle } = useToggleInterest(eventId, isInterested)

  return (
    <TouchableOpacity
      onPress={toggle}
      style={[styles.button, { backgroundColor: isInterested ? theme.border : theme.text }]}
      accessibilityLabel={`${isInterested ? 'Remove from' : 'Mark as'} interested events`}
    >
      <Text style={[styles.label, { color: isInterested ? theme.text : theme.background }]}>
        {isInterested ? 'Remove from Interested' : 'Mark as Interested'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600'
  },
  disabled: {
    opacity: 0.6
  }
})
