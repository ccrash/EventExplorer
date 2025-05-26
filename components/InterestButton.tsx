import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useEventStore } from '../store/useEventStore'
import { useInterestMutation } from '../hooks/useEventActions'
import { useThemeStore } from '../store/useThemeStore'

type Props = {
  eventId: string
}

export const InterestButton = ({ eventId }: Props) => {
  const { interestingIds } = useEventStore()
  const { theme } = useThemeStore()

  const isInterested = interestingIds.has(eventId)
  const mutation = useInterestMutation(eventId, isInterested)

  return (
    <TouchableOpacity
      onPress={() => mutation.mutate()}
      disabled={mutation.isPending}
      style={[
        styles.button,
        { backgroundColor: isInterested ? theme.border : theme.text },
        mutation.isPending && styles.disabled
      ]}
      accessibilityLabel={`${
        isInterested ? 'Remove from' : 'Mark as'
      } interested events`}
    >
      {mutation.isPending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.label, { color: isInterested ? theme.text : theme.background }]}>
          {isInterested ? 'Remove from Interested' : 'Mark as Interested'}
        </Text>
      )}
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
