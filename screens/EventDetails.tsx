import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useThemeStore} from '../store/useThemeStore'
import {RootStackParamList} from '../types/navigation'
import {RouteProp} from '@react-navigation/native'
import Animated from 'react-native-reanimated'
import {InterestButton} from '../components/InterestButton'
import {useNavigation} from '@react-navigation/native'
import {useLayoutEffect} from 'react'
import {dateFormat} from '../utils/dates'

export default function EventDetailsScreen() {
  const {params} = useRoute<RouteProp<RootStackParamList, 'EventDetail'>>()
  const navigation = useNavigation()
  const {theme} = useThemeStore()

  useLayoutEffect(() => {
    navigation.setOptions({title: params.event.name})
  }, [navigation, params.event.name])

  return (
    <ScrollView>
      <Animated.Image
        source={{uri: params.event.image}}
        style={styles.image}
        resizeMode="cover"
        sharedTransitionTag={`event-${params.event.id}`}
      />
      <View style={[styles.container]}>
        <View
          style={[
            styles.subcontainer,
            {borderColor: theme.border, backgroundColor: theme.background}
          ]}
        >
          <Text style={[styles.title, {color: theme.text}]}>{params.event.name}</Text>
          <Text style={[styles.row, {color: theme.text}]}>
            <Text style={styles.date}>{dateFormat(params.event.date)}</Text>
            <Text style={styles.separator}> | </Text>
            <Text style={styles.location}>{params.event.location}</Text>
          </Text>
          <Text style={[styles.organizerLabel, {color: theme.text}]}>
            {'Organized by '}
            <Text style={styles.organizerName}>{params.event.organizer}</Text>
          </Text>
          <Text style={[styles.description, {color: theme.text}]}>{params.event.description}</Text>
          <InterestButton eventId={params.event.id} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  subcontainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: 300
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    fontSize: 14
  },
  date: {
    fontWeight: 'bold'
  },
  separator: {
    fontWeight: 'normal'
  },
  location: {
    fontStyle: 'italic'
  },
  organizerLabel: {
    fontSize: 14,
    marginBottom: 8
  },
  organizerName: {
    fontWeight: '600',
    fontSize: 16
  },
  description: {
    fontSize: 16,
    marginBottom: 24
  }
})
