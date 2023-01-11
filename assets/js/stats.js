fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((resolve) => resolve.json())
  .then((data) => {
    const datos = data;
    const upcomingEvents = datos.events.filter((event) => event.date > datos.currentDate);
    const pastEvents = datos.events.filter((event) => event.date < datos.currentDate);
    const eventsByAttendance = attendance(pastEvents);
    mostAttendance(eventsByAttendance);
    lowestAttendance(eventsByAttendance);
    largerCapacity(eventsByAttendance);
    eventsByCategory(upcomingEvents, "upcoming-events");
    eventsByCategory(pastEvents, "past-events");
  })
  .catch((error) => console.log(error));

function attendance(events) {
  const eventsByAttendance = events
    .map((e) => ({
      ...e,
      attendance: ((e.assistance ?? e.estimate) / e.capacity) * 100,
    }))
    .sort((a, b) => b.attendance - a.attendance);
  return eventsByAttendance;
}

function mostAttendance(events) {
  document.getElementById("highest-attendance").innerHTML = `${events[0].name} ${events[0].attendance.toFixed(2)}%`;
}

function lowestAttendance(events) {
  document.getElementById("lowest-attendance").innerHTML = `${events[events.length - 1].name}  ${events[
    events.length - 1
  ].attendance.toFixed(2)} %`;
}

function largerCapacity(events) {
  const eventsByCapacity = events.sort((a, b) => b.capacity - a.capacity);
  document.getElementById(
    "highest-capacity"
  ).innerHTML = `${eventsByCapacity[0].name} - ${eventsByCapacity[0].capacity}`;
}

function eventsByCategory(eventsData, where) {
  const revenueAttendanceUpcoming = eventsData.map((e) => ({
    ...e,
    revenue: e.price * (e.estimate ?? e.assistance),
    attendance: ((e.assistance ?? e.estimate) / e.capacity) * 100,
    aux: 1,
  }));
  let upcomingObject = {};
  for (const event of revenueAttendanceUpcoming) {
    if (!Object.hasOwn(upcomingObject, event.category)) {
      upcomingObject[event.category] = { ...event };
    } else {
      upcomingObject[event.category].revenue += event.revenue;
      upcomingObject[event.category].attendance += event.attendance;
      upcomingObject[event.category].aux++;
    }
  }
  upcomingObject = Object.values(upcomingObject);
  upcomingObject.forEach((event) => {
    event.attendance /= event.aux;
  });
  let template = "";
  for (const event of upcomingObject) {
    template += ` <tr>
    <td>${event.category}</td>
    <td>${event.revenue.toLocaleString()}</td>
    <td>${event.attendance.toFixed(2)}%</td>
    </tr>`;
  }
  document.getElementById(where).innerHTML = template;
}
