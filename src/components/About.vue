<template>
	<v-container>
      <v-layout row wrap justify-center>
      <v-flex xs12>
			<br/>
            <v-toolbar-title>About</v-toolbar-title>
			<v-card-text>
				{{msg}}
			</v-card-text>
			<v-container>
			<v-layout row wrap justify-center>
				<v-flex xs10 md5>
					<img src="https://cdn.gamer-network.net/2018/articles/2018-09-11-13-03/Newzoo_App_Market_Revenues_2016_2021.png/EG11/format/jpg/resize/646x-1/quality/80"/>
				</v-flex>
				<v-flex xs10 md5>
					<img src="https://cdn.gamer-network.net/2018/articles/2018-09-11-13-03/Newzoo_Global_Number_Smartphone_Users_2016_2021.png"/>
				</v-flex>
			</v-layout>
			</v-container>
	  </v-flex>
	  </v-layout>
	</v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
		msg: "Games will account for 76% of the expected $92.1 billion mobile app revenue in 2018, according to the latest report from market intelligence firm Newzoo. In total, global mobile gaming revenue will reach nearly $70 billion by the end of this year, generated from three billion smartphone users. As data plans and hardware become cheaper, Newzoo estimates that the number of smartphone users will reach 3.8 billion by 2021, with total app revenue exceeding $139 billion. Having grown from $42.5 billion in 2016, games revenue is expected to reach $106.4 billion in 2021, a compound annual growth rate of 20.1%.China will continue to lead the market with 783 million smartphones, accounting for 26.1% of global users. Games revenue in the region will reach $37.9 billion by the end of this year, with the 573 million mobile gamers generating more than $23 billion -- more than 60% of China's total gaming revenue for 2018. The dominance of mobile in China is expected to continue outpacing other regions. According to Newzoo's consumer insights, 13.7% of all Chinese mobile players agree that they would buy new hardware to improve their gaming experience, compared to just 7.6% in the US, and 2.9% in Europe. India, meanwhile, has grown to the second largest global market despite low penetration. Although just 26.1% of the population are smartphone users, it now boasts over 350 million active devices, and is expected to surpass 600 million by 2021. The US and Western Europe have the highest smartphone penetration with 77% and 75% respectively. In Eastern Europe, however, the number dips significantly to 60%, and decreases further still regarding the Middle East and Africa which only has a penetration of 19.9%. In fact, China, India, the US, Russia, and Brazil account for over half of all smartphones users globally. Samsung and Apple will continue dominating the market, accounting for more than 50% of the global share of smartphones between them."
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{width: 90%;height: 250px;}
</style>
