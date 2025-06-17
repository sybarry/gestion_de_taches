import request from 'supertest';
import app from '../src/app';

describe('API de gestion de tâches', () => {
  let createdTaskId: string;

  it('GET /tasks → doit retourner une liste (initialement vide)', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks → doit créer une nouvelle tâche', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Tâche test',
        description: 'Ceci est une tâche de test',
        status: 'pending'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Tâche test');
    createdTaskId = res.body.id;
  });

  it('GET /tasks → doit contenir la nouvelle tâche', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.some((t: any) => t.id === createdTaskId)).toBe(true);
  });

  it('DELETE /tasks/:id → doit supprimer la tâche', async () => {
    const res = await request(app).delete(`/tasks/${createdTaskId}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('DELETE /tasks/:id → erreur si tâche introuvable', async () => {
    const res = await request(app).delete(`/tasks/___invalide___`);
    expect(res.status).toBe(404);
  });
});
