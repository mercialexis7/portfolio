import ICAL from 'ical.js'

export function parseICS(icsData) {
  const jcalData = ICAL.parse(icsData)
  const comp = new ICAL.Component(jcalData)
  const vevents = comp.getAllSubcomponents('vevent')
  const events = []

  vevents.forEach((vevent) => {
    const event = new ICAL.Event(vevent)

    const eventStart = event.startDate.toJSDate()
    const eventEnd = event.endDate.toJSDate()

    events.push({
      summary: event.summary,
      description: event.description,
      location: event.location || '',
      startDate: eventStart,
      endDate: eventEnd
    })
  })

  return events
}
