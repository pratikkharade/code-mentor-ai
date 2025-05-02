import axios from 'axios';

export const execute = async (pythonCode) => {
    if (!pythonCode) {
        return {
            success: false,
            output: 'No input code'
        }
    }
    try {
        const response = await axios.post('http://127.0.0.1:5000/run_code', {
            code: pythonCode
        });
  
        if (response?.data?.output) {
            return {
                success: true,
                output: response.data.output
            }
        } else {
            return {
                success: false,
                output: 'Error occurred while running the code'
            }
        }
    } catch (err) {
        return {
            success: false,
            output: err?.response?.data?.error 
                || 'Error occurred while running the code'
        }
    }
}