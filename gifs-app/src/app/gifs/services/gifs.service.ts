import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'history';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; // Record<string, Gif[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

// {
//   'goku': [gif1, gif2, gif3],
//   'saitama': [gif1, gif2, gif3],
//   'dragon ball': [gif1, gif2, gif3],
// }

// Record<string, Gif[]> // firma de lo de arriba, Records es de typeScript

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]); // [gif1, gif2, gif3, ...]
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for( let i = 0; i < this.trendingGifs().length; i+=3 ){
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    // console.log(groups);
    return groups; // [[gif1, gif2, gif3], [gif1, gif2, gif3], [gif1, gif2, gif3]]
  })

  searchHistrory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistrory()));

  constructor(){
    this.loadTrendingGifs();
  }


  saveToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistrory());
    localStorage.setItem(GIF_KEY, historyString);
  });


  loadTrendingGifs() {

    if( this.trendingGifsLoading() ) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
      },
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifsArray(resp.data);
      this.trendingGifs.update((currentGifs) => [
        ...currentGifs,
        ...gifs
      ]);
      this.trendingGifsLoading.set(false);
      this.trendingPage.update((current) => current + 1);
      // console.log(gifs);
    } );

  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params :{
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      }
    }).pipe(
      map( ({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifsArray(items)),
      tap( items => { // el tap no regresa nada al cotrario del map, puede
        this.searchHistrory.update( history => ({ // () para hacer un return implicito de un nuevo objeto
          ...history,
          [query.toLowerCase()]: items
        }))
      })


      //TODO: Historial
    );
    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifsArray(resp.data);
    //   console.log({search: gifs});
    // })
  }

  getHistoryGifs( query: string ): Gif[]{
    return this.searchHistrory()[query] ?? [];
    //return this.searchHistrory()[query] ?? [];
  }


}
