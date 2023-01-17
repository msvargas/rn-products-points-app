/**
 * @format
 */

import {renderHook, waitFor} from '@testing-library/react-native';
import useFetch from '../src/hooks/useFetch';
import {API_BASE_URL} from '../src/constants';
import {ProductList} from '../src/types/Product.types';

describe('useFetch hook', () => {
  it('should return fetch state', async () => {
    const {result} = renderHook(() =>
      useFetch('https://jsonplaceholder.typicode.com/todos/1'),
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  });

  it('should return API products', async () => {
    const {result} = renderHook(() =>
      useFetch<ProductList>(API_BASE_URL + '/products'),
    );

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.data).toBeInstanceOf(Array);
    expect(result.current.data?.[0]).toEqual({
      createdAt: '2022-12-09T06:34:25.607Z',
      product: 'Handmade Metal Shoes',
      points: 16434,
      image: 'https://loremflickr.com/640/480/transport',
      is_redemption: false,
      id: '1',
    });
  });
});
