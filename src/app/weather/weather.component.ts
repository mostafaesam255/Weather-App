import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Weather, Forecast } from '../weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  currentWeather: Weather | undefined;
  forecast: Forecast | undefined;
  dailyForecast: any[] = []; 
  currentDate: Date = new Date();
  private apiKey = 'bbf71a7e1b7f5661a77ffc1d1f726525';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getWeather() {
    this.http.get<Weather>(`${this.apiUrl}/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=en`)
      .subscribe({
        next: (data) => {
          this.currentWeather = data;
          this.getForecast();
        },
        error: (error) => {
          console.error('Error fetching weather data', error);
          alert('Check the city name!');
        }
      });
  }
  getForecast() {
    this.http.get<Forecast>(`${this.apiUrl}/forecast?q=${this.city}&appid=${this.apiKey}&units=metric&lang=en`)
      .subscribe({
        next: (data) => {
          this.forecast = data;
          this.filterDailyForecast();
        },
        error: (error) => {
          console.error('Error fetching expectations', error);
        }
      });
  }
  filterDailyForecast() {
    if (!this.forecast || !this.forecast.list) return;
    const dailyData: any[] = [];
    const seenDates = new Set<string>();
    for (const entry of this.forecast.list) {
      const date = new Date(entry.dt_txt);
      const day = date.toISOString().split('T')[0];
      if (!seenDates.has(day) && date.getHours() >= 12) {
        dailyData.push(entry);
        seenDates.add(day);
      }
      if (dailyData.length === 5) break;
    }
    this.dailyForecast = dailyData;
  }
}