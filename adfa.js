var a = {
    "trigger_day": 2,
    "name": "policy1",
    "roll_back_steps": [{
        "params_values": "['system_env', 'sites']",
        "script_id": 5,
        "sites": "*",
        "script_name": "test_check_env",
        "order": 1
    }, {
        "params_values": "['system_env', 'sites']",
        "script_id": 7,
        "sites": "*",
        "script_name": "test_check_env",
        "order": 2
    }],
    "trigger_time": "00:00",
    "trigger_mode": 1,
    "flows": [{
        "description": "",
        "steps": [{
            "params_values": "['system_env', 'sites']",
            "script_id": 5,
            "sites": "*",
            "script_name": "test_check_env",
            "order": 1
        }, {
            "params_values": "['system_env', 'sites']",
            "script_id": 7,
            "sites": "*",
            "script_name": "test_check_env",
            "order": 2
        }],
        "order": 1,
        "id": 6
    }, { "description": "", "steps": [{ "params_values": "['system_env', 'sites']", "script_id": 5, "sites": "*", "script_name": "test_check_env", "order": 1 }, { "params_values": "['system_env', 'sites']", "script_id": 7, "sites": "*", "script_name": "test_check_env", "order": 2 }], "order": 2, "id": 7 }],
    "id": 4
}

var b = {
    'name': 'value1-test-trigger',
    'snapshot': {
        "trigger_day": 2,
        "name": "policy1",
        "roll_back_steps": [{
                "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] },
                "script_id": 5,
                "sites": ['172.16.140.168'],
                "script_name": "test_check_env",
                "order": 1
            },
            {
                "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] },
                "script_id": 5,
                "sites": ['172.16.140.168'],
                "script_name": "test_check_env",
                "order": 2
            }
        ],
        "trigger_time": "00:00",
        "trigger_mode": 1,
        "flows": [{
                "description": "description",
                "name": 'flow1',
                "steps": [{ "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] }, "script_id": 5, "sites": ['172.16.140.168'], "script_name": "test_check_env", "order": 1 },
                    {
                        "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] },
                        "script_id": 5,
                        "sites": ['172.16.140.168'],
                        "script_name": "test_check_env",
                        "order": 2
                    }
                ],
                "order": 1,
                "id": 6
            },
            {
                "description": "description",
                "name": 'flow1',
                "steps": [{ "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] }, "script_id": 5, "sites": ['172.16.140.168'], "script_name": "test_check_env", "order": 1 },
                    {
                        "params_values": { 'system_env': 'java_1.7', 'sites': ['172.16.140.168'] },
                        "script_id": 5,
                        "sites": ['172.16.140.168'],
                        "script_name": "test_check_env",
                        "order": 2
                    }
                ],
                "order": 2,
                "id": 7
            }
        ],
        "id": 4
    },
    'project_id': 6,
    'sites': ['192.168.0.1', '192.168.0.2'],
}