import { Router } from 'express';
import controller from '../controllers/user.js';
import rateLimiter from '../middleware/rate-limiter.js';

const router = Router();

//API4:2023 – Consumo irrestrito de recursos
//Apesar que o método de login tenha um rate limiter
//outros métodos como o de criação podem ser impactados por miliares de requisições
//que podem comprometer o sistema
//O ideal é que um usuário pelo menos tenha um debounce no tempo de requisição caso
//seja uma quantidade elevada
//ou então caso se enquadre nas regras de negócio
//implementar um método que faça inserção/edição ou deleção em batch
//utilizando tabelas por exemplo


//API1:2023 – Falha de autenticação a nível de objeto
//Não há validação nas rotas de acesso, há apenas uma validação no front-end
//que pode ser facilmente burlada por atacantes
//no back-end não há nenhum middleware validando isso
//permitindo que os atacantes tenham acesso a rota em um primeiro momento
//validar utilizando números como niveis de acesso 
//pode ser confuso também;

router.get('/me', controller.me);
router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/logout', controller.logout);

// Número de logins será limitado pelo rateLimiter
router.post('/login', rateLimiter, controller.login);

export default router;
