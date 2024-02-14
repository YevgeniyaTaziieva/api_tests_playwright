import {test, expect} from '@playwright/test'

test.describe('API tests', ()=> {
    
    test('API GET reguest', async ({request})=>{
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect (response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('Michael');
    console.log(await response.json());
})

test('API POST reguest', async ({request})=>{
    const response = await request.post('https://reqres.in/api/users', {
        data:{
            "name": "Yevheniia",
            "job": "student"
        }
    });
    expect(response.status()).toBe(201);
    const text = await response.text();
    expect(text).toContain('Yevheniia');
    console.log(await response.json());
})

test('API PUT reguest', async ({request})=>{
    const response = await request.put('https://reqres.in/api/users/2', {
        data:{
            "name": "Yevheniia",
            "job": "qa"
        }
    });
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('qa');
    console.log(await response.json());
})

test('API DELETE reguest', async ({request})=>{
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
})
})

