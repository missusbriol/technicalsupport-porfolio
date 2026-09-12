import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../shared/reveal.directive';
import { CONTACTS } from '../../data/contacts.data';

// Paste the /exec URL from your deployed Google Apps Script web app here.
// This is only the public endpoint URL; the Apps Script itself stays in Google.
const CALENDAR_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyGoC5gmqO_2o_bUKLiDLRjNDTU_bfoFJr_iLeY0H4XprGfR1iC7vt6zwJVxI1U7nhN/exec';
const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
  '12:00 AM (midnight)',
];

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contacts = CONTACTS;
  today = new Date().toISOString().slice(0, 10);
  booking = {
    name: '',
    email: '',
    date: '',
    time: '',
    topic: 'Technical support consultation',
  };
  bookingSent = false;
  submitting = false;
  submissionError = '';
  availabilityLoading = false;
  availabilityError = '';
  availableTimes = [...TIME_SLOTS];

  async submitBooking(): Promise<void> {
    this.bookingSent = false;
    this.submissionError = '';

    if (!CALENDAR_WEB_APP_URL) {
      this.submissionError = 'Scheduling is being set up. Please use the email link to get in touch.';
      return;
    }

    this.submitting = true;
    try {
      await fetch(CALENDAR_WEB_APP_URL, {
        method: 'POST',
        // Apps Script accepts the request but does not expose POST responses to
        // every browser origin. An opaque response prevents a false error after
        // the calendar event and sheet row have already been created.
        mode: 'no-cors',
        // A plain-text request avoids a CORS preflight for the Apps Script web app.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(this.booking),
      });

      this.bookingSent = true;
      this.booking = {
        name: '',
        email: '',
        date: '',
        time: '',
        topic: 'Technical support consultation',
      };
      this.availableTimes = [...TIME_SLOTS];
    } catch {
      this.submissionError = 'We could not send your request. Please try again or email Ma. Casandra directly.';
    } finally {
      this.submitting = false;
    }
  }

  async loadAvailableTimes(): Promise<void> {
    this.availabilityError = '';
    this.availableTimes = [...TIME_SLOTS];

    if (!this.booking.date || !CALENDAR_WEB_APP_URL) {
      this.selectFirstAvailableTime_();
      return;
    }

    this.availabilityLoading = true;
    try {
      const url = `${CALENDAR_WEB_APP_URL}?action=availability&date=${encodeURIComponent(this.booking.date)}`;
      const response = await fetch(url);
      const result = await response.json();

      if (!result.ok || !Array.isArray(result.availableTimes)) {
        throw new Error('Availability could not be loaded.');
      }

      this.availableTimes = result.availableTimes;
      this.selectFirstAvailableTime_();
    } catch {
      this.availableTimes = [...TIME_SLOTS];
      this.availabilityError = 'Live availability could not be loaded. Please select a time and Ma. Casandra will confirm it.';
      this.selectFirstAvailableTime_();
    } finally {
      this.availabilityLoading = false;
    }
  }

  private selectFirstAvailableTime_(): void {
    if (!this.availableTimes.includes(this.booking.time)) {
      this.booking.time = this.availableTimes[0] || '';
    }
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
