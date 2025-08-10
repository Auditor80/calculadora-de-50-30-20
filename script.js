document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('income');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsContainer = document.getElementById('results');
    const errorMessageDiv = document.getElementById('error-message');

    const needsAmountEl = document.getElementById('needs-amount');
    const wantsAmountEl = document.getElementById('wants-amount');
    const savingsAmountEl = document.getElementById('savings-amount');
    const totalAmountEl = document.getElementById('total-amount');

    const formatCurrency = (amount) => {
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const calculateAndDisplay = () => {
        const income = parseFloat(incomeInput.value);

        // --- Validation ---
        if (isNaN(income) || income < 0) {
            errorMessageDiv.textContent = 'Por favor, insira um valor de renda válido e positivo.';
            errorMessageDiv.classList.remove('hidden');
            incomeInput.classList.add('input-error');
            resultsContainer.classList.remove('visible');
            setTimeout(() => resultsContainer.classList.add('hidden'), 500); // Hide after animation
            return;
        }

        // --- Clear errors if valid ---
        errorMessageDiv.classList.add('hidden');
        incomeInput.classList.remove('input-error');

        // --- Calculation ---
        const needs = income * 0.50;
        const wants = income * 0.30;
        const savings = income * 0.20;
        const total = needs + wants + savings;

        // --- Display Results ---
        needsAmountEl.textContent = formatCurrency(needs);
        wantsAmountEl.textContent = formatCurrency(wants);
        savingsAmountEl.textContent = formatCurrency(savings);
        totalAmountEl.textContent = formatCurrency(total);
        
        // --- Show results with animation ---
        if (resultsContainer.classList.contains('hidden')) {
            resultsContainer.classList.remove('hidden');
            // Use a timeout to allow the display property to change before adding the class for transition
            setTimeout(() => {
                resultsContainer.classList.add('visible');
            }, 10);
        }
    };

    calculateBtn.addEventListener('click', calculateAndDisplay);
    
    incomeInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            calculateAndDisplay();
        }
    });

    // Remove error styling when user starts typing again
    incomeInput.addEventListener('input', () => {
        if (incomeInput.classList.contains('input-error')) {
            incomeInput.classList.remove('input-error');
            errorMessageDiv.classList.add('hidden');
        }
    });
});

