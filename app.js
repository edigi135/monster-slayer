new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function() {
			let damage = this.calculateDamage(3, 10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hit Monster for ' + damage + ' damage'
			});
			if (this.checkWin()) return;

			this.monsterAttack();
		},
		specialAttack: function() {
			let damage = this.calculateDamage(10, 20);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hit Monster HARD for ' + damage + ' damage'
			});

			if (this.checkWin()) return;

			this.monsterAttack();
		},
		heal: function() {
			this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals for 10'
			});
			this.monsterAttack();
		},
		giveUp: function() {
			this.gameIsRunning = false;
		},
		monsterAttack: function() {
			let damage = this.calculateDamage(5, 12);
			this.playerHealth -= damage;
			this.checkWin();
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hit you for ' + damage + ' damage'
			});
		},
		calculateDamage(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				if (confirm('You Won! New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
					return true;
				}
			} else if (this.playerHealth <= 0) {
				if (confirm('You Lost. New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
					return true;
				}
			}
			return false;
		}
	}
});