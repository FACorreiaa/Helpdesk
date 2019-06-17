const mongoose = require('mongoose');

const {Evaluation} = require('../models/evaluationModel')

//
// G01: número total de pedidos de helpdesk, dado um intervalo de tempo
// 
//
function global_01(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}


//
// G02: percentagem de pedidos de helpdesk
// que não foram alvo de avaliação por parte dos clients, dado um intervalo de tempo
// 
//
//
function global_02(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                neval: { $sum: { $cond : [{ $eq : ["$score", 0] }, 1, 0] } },
                total: { $sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                percentage: { $multiply: [ {$divide: [ "$neval", "$total" ]}, 100]}
            }
        }
    ]);
    return res.exec();
}

//
// G03: Tempo médio de resposta a um pedido por cada nível de prioridade de atendimento
// 
// 
//
function global_03(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } },
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : "$priority",
                avgRTime: { $avg: "$response_time" },
            }
        }
    ]);
    return res.exec();
}

//
// G04: Avaliação média da qualidade do serviço do helpdesk
// 
//
function global_04(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } },
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                avgScore: { $avg: "$score" },
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}

//
// G05: Desvio padrão das votações dos clientes
// 
//
function global_05(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } },
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                stdDevScore: { $stdDevPop: "$score" }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}

//
// G06: Os colaboradores  que responderam a pedidos com mais celeridade (ranking)
// 
//
function global_06(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } }
                ]
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgRTime: { $avg: "$response_time" }
            }
        },
        {
            $sort: {'avgRTime': 1}
        },
        {
            $limit: 10
        }
    ]);
    return res.exec();
}

//
// G07: Os colaboradores que responderam às melhores pontuações por parte dos clientes (ranking)
// 
//
function global_07(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { requested_on: { $gte: d0 } }, 
                    { requested_on: { $lte: d1 } },
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgScore: { $avg: "$score" }
            }
        },
        {
            $sort: {'avgScore': -1}
        },
        {
            $limit: 10
        }
    ]);
    return res.exec();
}


//
// C01: número total de pedidos de helpdesk, dado um colaborador
// 
//
function assigned_to_01(assigned_to_id) {
    let res = Evaluation.aggregate([
        {
            $match: {
                'assigned_to.id': { $eq: assigned_to_id }
            }
        },
        {
            $group: {
                _id : null,
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0    
            }
        }
    ]);
    return res.exec();
}


//
// C02: percentagem de pedidos de helpdesk
// que não foram alvo de avaliação por parte dos clients, dado um colaborador
// 
//
//
function assigned_to_02(assigned_to_id) {
    let res = Evaluation.aggregate([
        {
            $match: {
                'assigned_to.id': { $eq: assigned_to_id }
            }
        },
        {
            $group: {
                _id : null,
                neval: { $sum: { $cond : [{ $eq : ["$score", 0] }, 1, 0] } },
                total: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                percentage: { $multiply: [ {$divide: [ "$neval", "$total" ]}, 100]}
            }
        }
    ]);
    return res.exec();
}

//
// C03: Tempo médio de resposta a um pedido por cada nível de prioridade de atendimento
// 
// 
//
function assigned_to_03(assigned_to_id) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'assigned_to.id': { $eq: assigned_to_id }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : "$priority",
                avgRTime: { $avg: "$response_time" },
            }
        }
    ]);
    return res.exec();
}


//
// C04: Avaliação média da qualidade do serviço do helpdesk
// 
//
function assigned_to_04(assigned_to_id) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'assigned_to.id': { $eq: assigned_to_id }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                avgScore: { $avg: "$score" },
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}


//
// C05: Desvio padrão das votações dos clientes
// 
//
function assigned_to_05(assigned_to_id) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'assigned_to.id': { $eq: assigned_to_id }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                stdDevScore: { $stdDevPop: "$score" }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}

//
// P01: número total de pedidos de helpdesk, para dado produto
// 
//
function product_01(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                'project.product_name': { $eq: product_name }
            }
        },
        {
            $group: {
                _id : null,
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}

//
// P02: percentagem de pedidos de helpdesk
// que não foram alvo de avaliação por parte dos clients, para dado produto
// 
//
//
function product_02(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                'project.product_name': { $eq: product_name }
            }
        },
        {
            $group: {
                _id : null,
                neval: { $sum: { $cond : [{ $eq : ["$score", 0] }, 1, 0] } },
                total: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                percentage: { $multiply: [ {$divide: [ "$neval", "$total" ]}, 100]}
            }
        }
    ]);
    return res.exec();
}


//
// P03: Tempo médio de resposta a um pedido por cada nível de prioridade de atendimento
// 
// 
//
function product_03(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'project.product_name' : { $eq: product_name }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : "$priority",
                avgRTime: { $avg: "$response_time" },
            }
        }
    ]);
    return res.exec();
}


//
// P04: Avaliação média da qualidade do serviço do helpdesk
// 
//
function product_04(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'project.product_name': { $eq: product_name }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                avgScore: { $avg: "$score" },
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}


//
// P05: Desvio padrão das votações dos clientes
// 
//
function product_05(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'project.product_name': { $eq: product_name }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : null,
                stdDevScore: { $stdDevPop: "$score" }
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);
    return res.exec();
}

//
// P06: Os colaboradores  que responderam a pedidos com mais celeridade (ranking)
// 
//
function product_06(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                'project.product_name': { $eq: product_name }
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgRTime: { $avg: "$response_time" }
            }
        },
        {
            $sort: {'avgRTime': 1}
        },
        {
            $limit: 10
        }
    ]);
    return res.exec();
}

//
// P07: Os colaboradores que responderam às melhores pontuações por parte dos clientes (ranking)
// 
//
function product_07(product_name) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { 'project.product_name': { $eq: product_name }},
                    { score: { $ne: 0} } 
                ]
            }
        },
        {
            $group: {
                _id : '$assigned_to',
                avgScore: { $avg: "$score" }
            }
        },
        {
            $sort: {'avgScore': -1}
        },
        {
            $limit: 10
        }
    ]);
    return res.exec();
}

//
// T01: Gráfico com a evolução do número de pedidos ao longo do tempo (entre datas) (resolução: minuto)
// 
//
function temporal_01(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { created_on: { $gte: d0 } }, 
                    { created_on: { $lte: d1 } } 
                ]
            }
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" },
                    hour: { $hour: "$created_on" },
                    minutes: { $minute: "$created_on" }
                }
            }
        },
        {
            $group: {
                _id: '$newDate',
                count: {$sum: 1}
            }
        }
    ]);
    return res.exec();
}


//
// T02: Gráfico com a evolução da avaliação média da qualidade dos produtos (resolução: minuto)
// 
//
function temporal_02(d0, d1) {
    let res = Evaluation.aggregate([
        {
            $match: {
                $and: [ 
                    { created_on: { $gte: d0 } }, 
                    { created_on: { $lte: d1 } },
                    { score: { $ne: 0 } }
                ]
            }
        },
        {
            $project:
            {
                newDate: {
                    year: { $year: "$created_on" },
                    month: { $month: "$created_on" },
                    day: { $dayOfMonth: "$created_on" },
                    hour: { $hour: "$created_on" },
                    minutes: { $minute: "$created_on" }
                }
            }
        },
        {
            $group: {
                _id: '$newDate',
                avgScore: { $avr: '$score' }
            }
        }
    ]);
    return res.exec();
}

module.exports = {
    global_01, global_02, global_03, global_04, global_05, global_06, global_07,
    assigned_to_01, assigned_to_02, assigned_to_03, assigned_to_04, assigned_to_05,
    product_01, product_02, product_03, product_04, product_05, product_06, product_07,
    temporal_01, temporal_02
};