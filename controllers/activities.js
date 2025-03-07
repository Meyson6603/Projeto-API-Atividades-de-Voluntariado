const Database = require('../database/index')
const dbActivities = new Database('activities')
// const dbUsers = new Database('users')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config({ path: './config/.env' })
// const bcrypt = require('bcrypt');

const keySecrect = process.env.KEYSECRET


function createActivity(req, res) {
    const { activityName, activityDate, activityVacancies, activityLocation, vacanciesFilled } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!activityName || !activityDate || !activityVacancies || !activityLocation) {
        return res.status(400).send('Todos os campos (Nome, Data, Vagas e Local) são necessários');
    }

    // Verifica se o usuário está autenticado
    const cookieJWT = req.cookies["session"];
    if (!cookieJWT) {
        return res.status(401).send('Não autorizado');
    }

    try {
        const user = jwt.verify(cookieJWT, keySecrect); // Verifica o JWT do usuário
        // Verifica se o usuário autenticado tem o papel de 'admin'
        if (user.role !== 'admin') {
            return res.status(403).send('Permissão negada');
        }

        // Obtém a data atual e ajusta para o fuso horário de Brasília (UTC -3)
        const currentDate = new Date();
        const brasíliaTime = new Date(currentDate.getTime() - (3 * 60 * 60 * 1000));
        // Cria a nova atividade
        const newActivity = {
            activityName,
            activityDate,
            activityVacancies,
            activityLocation,
            vacanciesFilled,
            createdBy: user.username, // Nome do admin que criou a atividade
            createdAt: brasíliaTime.toISOString() // Data de criação da atividade
        };

        // Aqui podemos armazenar a atividade no banco de dados, por exemplo
        dbActivities.put(crypto.randomUUID({ number: 1 }), JSON.stringify(newActivity), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao criar atividade' });
            }

            return res.status(201).json({
                message: 'Atividade criada com sucesso!',
                activity: newActivity,
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send('Erro de autenticação');
    }
}

function getAllActivities(req, res) {

    // Recupera todas as atividades do banco de dados
    // dbActivities.open()
    dbActivities.readAllData((err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao buscar atividades' });
        }
        // console.log(data)
        // let activities = [];
        // data.forEach(element => {
        //     activities.push(JSON.parse(element.value)); // Assumindo que os dados das atividades estão em JSON
        // });

        // Responde com todas as atividades
        return res.status(200).json(data);
    });



}

function delActivity(req, res) {
    const key = req.body.key; // A chave da atividade a ser excluída

    // Verifica se a chave foi fornecida
    if (!key) {
        return res.status(400).send('Chave da atividade é necessária');
    }

    // Verifica se o usuário está autenticado
    const cookieJWT = req.cookies["session"];
    if (!cookieJWT) {
        return res.status(401).send('Não autorizado');
    }

    try {
        const user = jwt.verify(cookieJWT, keySecrect); // Verifica o JWT do usuário
        // Verifica se o usuário autenticado tem o papel de 'admin'
        if (user.role !== 'admin') {
            return res.status(403).send('Permissão negada');
        }

        // Exclui a atividade do banco de dados
        dbActivities.del(key, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao excluir a atividade' });
            }

            return res.status(200).json({
                message: 'Atividade excluída com sucesso!',
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send('Erro de autenticação');
    }
}

function subscribeToActivity(req, res) {
    const { key } = req.body;  // Assumindo que o ID da atividade seja passado

    // Verifica se a chave da atividade foi fornecida
    if (!key) {
        return res.status(400).send('ID da atividade é necessário');
    }

    // Verifica se o usuário está autenticado
    const cookieJWT = req.cookies["session"];
    if (!cookieJWT) {
        return res.status(401).send('Não autorizado');
    }

    try {
        const user = jwt.verify(cookieJWT, keySecrect);
        console.log(user)// Verifica o JWT do usuário

        // Obtém o email e o username do usuário autenticado
        const { username, email } = user;

        // Recupera a atividade do banco de dados
        dbActivities.readData(key, (err, activityData) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao buscar a atividade' });
            }

            if (!activityData) {
                return res.status(404).send('Atividade não encontrada');
            }

            let activity = JSON.parse(activityData.value); // Assumindo que os dados da atividade estão em JSON

            // Verifica se o número de vagas disponíveis já foi atingido
            if (activity.activityVacancies <= activity.vacanciesFilled.length) {
                return res.status(400).send('Não há vagas disponíveis para esta atividade');
            }

            // Adiciona o usuário ao array vacanciesFilled
            activity.vacanciesFilled.push({ email, username });

            // Atualiza a atividade no banco de dados
            dbActivities.put(key, JSON.stringify(activity), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Erro ao atualizar a atividade' });
                }

                return res.status(200).json({
                    message: 'Inscrição realizada com sucesso!',
                    activity: activity,
                });
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send('Erro de autenticação');
    }
}

function cancelsubcribeActivity(req, res) {
    const key = req.body.key;
    // const userEmail = req.body.email// Assumindo que o ID da atividade seja passado

    // Verifica se a chave da atividade foi fornecida
    if (!key) {
        return res.status(400).send('ID da atividade é necessário');
    }

    // Verifica se o usuário está autenticado
    const cookieJWT = req.cookies["session"];
    if (!cookieJWT) {
        return res.status(401).send('Não autorizado');
    }

    try {
        const user = jwt.verify(cookieJWT, keySecrect);
        console.log(user)// Verifica o JWT do usuário

        // Obtém o email e o username do usuário autenticado
        const { email } = user;

        // Recupera a atividade do banco de dados
        dbActivities.readData(key, (err, activityData) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao buscar a atividade' });
            }

            if (!activityData) {
                return res.status(404).send('Atividade não encontrada');
            }

            let activity = JSON.parse(activityData.value); // Assumindo que os dados da atividade estão em JSON

            // Verifica se o número de vagas disponíveis já foi atingido
            if (activity.activityVacancies <= activity.vacanciesFilled.length) {
                return res.status(400).send('Não há vagas disponíveis para esta atividade');
            }

            // Adiciona o usuário ao array vacanciesFilled
            const IndexUserActivity = activity.vacanciesFilled.findIndex(user => user.email == email)
            activity.vacanciesFilled.splice(IndexUserActivity, 1)

            // Atualiza a atividade no banco de dados
            dbActivities.put(key, JSON.stringify(activity), (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Erro ao atualizar a atividade' });
                }

                return res.status(200).json({
                    message: 'Inscrição realizada com sucesso!',
                    activity: activity,
                });
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(401).send('Erro de autenticação');
    }
}

module.exports = { createActivity, getAllActivities, delActivity, subscribeToActivity, cancelsubcribeActivity }