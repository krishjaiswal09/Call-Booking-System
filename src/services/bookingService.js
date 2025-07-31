// services/bookingService.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const BOOKINGS_COLLECTION = 'bookings';

// Simple time conversion utility
const timeToMinutes = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalHours = hours;
  
  if (period === 'PM' && hours !== 12) totalHours += 12;
  if (period === 'AM' && hours === 12) totalHours = 0;
  
  return totalHours * 60 + minutes;
};

// Check if two time ranges overlap
const hasOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

// Check for booking conflicts
export const checkBookingConflict = async (date, startTime, callDuration) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = startMinutes + callDuration;
  
  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where('date', '==', date)
  );
  
  const snapshot = await getDocs(q);
  
  for (const docSnapshot of snapshot.docs) {
    const booking = docSnapshot.data();
    const bookingStart = timeToMinutes(booking.startTime);
    const bookingEnd = bookingStart + booking.callDuration;
    
    if (hasOverlap(startMinutes, endMinutes, bookingStart, bookingEnd)) {
      return {
        hasConflict: true,
        conflictingBooking: { id: docSnapshot.id, ...booking }
      };
    }
  }
  
  return { hasConflict: false };
};

// Create a new booking
export const createBooking = async (bookingData) => {
  const { date, startTime, callType } = bookingData;
  const callDuration = callType === 'Onboarding' ? 40 : 20;
  
  // Check for conflicts first
  const conflictCheck = await checkBookingConflict(date, startTime, callDuration);
  if (conflictCheck.hasConflict) {
    throw new Error('This time slot overlaps with an existing booking.');
  }
  
  // Create the booking
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...bookingData,
    callDuration,
    createdAt: serverTimestamp()
  });
  
  return docRef.id;
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
};

// Subscribe to bookings for a specific date
export const subscribeToBookingsByDate = (date, callback) => {
  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where('date', '==', date)
  );
  
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(bookings);
  });
};